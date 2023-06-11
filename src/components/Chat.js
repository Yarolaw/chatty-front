import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, serverTimestamp, orderBy, query, onSnapshot } from 'firebase/firestore';
import Picker, { EmojiStyle } from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Avatar from 'react-avatar';
import { v4 as uuid } from 'uuid';
import db from '../../firebase';
import { ReactComponent as SendMessageIcon } from '../src/images/send-message.svg';
import { ReactComponent as TitleLogoHeader } from '../src/images/logo-title-header.svg';
import { offline, online } from '../helpers/helpers';

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [messageList, setMessageList] = useState([]);
  const [messageFromFirestore, setMessageFromFirestore] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');

  const getMessagesFromDB = async () => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach(doc => {
      items.push(doc.data());
      setMessageFromFirestore(items);
    });
  };

  const sendMessage = async () => {
    if (currentMessage) {
      let messageData;
      messageData = {
        messageId: uuid(),
        room: room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
      };

      await socket.emit('send_message', messageData);
      setMessageList(prev => [...prev, messageData]);
      setCurrentMessage('');

      try {
        const docRef = await addDoc(collection(db, 'messages'), { ...messageData, createdAt: serverTimestamp() });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
    getMessagesFromDB();
  };

  // eslint-disable-next-line no-unused-vars
  const onEmojiClick = (emojiObject, event) => {
    setCurrentMessage(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const handleTyping = () => socket.emit('typing', `${username} is typing`);

  useEffect(() => {
    getMessagesFromDB();
  }, []);

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList(list => [...list, data]);
      setMessageFromFirestore(list => [...list, data]);

      socket.on('typingResponse', data => setTypingStatus(data));
    });
  }, [socket]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), snapshot => {
      const onlineUsers = snapshot.docs
        .map(doc => {
          const user = doc.data();
          if (user.online) {
            return user.name;
          }
        })
        .filter(Boolean);

      setOnlineUsers(onlineUsers);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <Avatar className="chat-header-item" round="20px" textSizeRatio={1.75} size="32" name={username} />)
        <p>Stream Chat</p>
        <TitleLogoHeader className="chat-header-item" style={{ width: '32px', height: '32px' }} />
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageFromFirestore.map(messageContent => {
            const isAuthorOnline = onlineUsers.includes(messageContent.author);
            return (
              <div
                key={messageContent.messageId}
                className="message"
                id={username === messageContent.author ? 'you' : 'other'}>
                <div>
                  <div className="message-box">
                    <span className={`status ${isAuthorOnline ? 'status__active' : ''}`}></span>
                    {username !== messageContent.author && (
                      <Avatar round="20px" textSizeRatio={1.75} size="32" name={messageContent.author} />
                    )}
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                  </div>
                  <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div>
        <p>{typingStatus}</p>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message..."
          onChange={event => {
            setCurrentMessage(event.target.value);
          }}
          onKeyUp={e => {
            e.key === 'Enter' && e.target.value !== '' && sendMessage();
          }}
          onKeyDown={handleTyping}
        />
        <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker(val => !val)}
        />
        {showPicker && (
          <Picker
            pickerStyle={{ width: '100%' }}
            emojiStyle={EmojiStyle.NATIVE}
            onEmojiClick={onEmojiClick}
            theme="dark"
          />
        )}

        <button onClick={e => e.target.value !== '' && sendMessage()}>
          <SendMessageIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
