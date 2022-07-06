import {React, useState} from "react";
import './Contact.scss';
import {Link, useLocation} from 'react-router-dom';

function Contact(props) {
    const location = useLocation();
    const [receiverName, setReceiverName] = useState(location?.state?.recipent);
    const [topic, setTopic] = useState();
    const [content, setContent] = useState();
    const apiNewMessageUrl = process.env.REACT_APP_API_BASE_URL+'/api/messages/new';

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(receiverName);
        const data = await apiNewMessage({receiverName, topic, content});
        console.log(data);
    }


    const apiNewMessage = async (data) => {
    return fetch(apiNewMessageUrl, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      });
    }


    return (
        <div className="contact-wrapper soft-edges old-paper-background">
            <h1>New Message:</h1>
            <form className="contact-form"  onSubmit={handleSubmit}>
                <div className="topic-wrapper">
                    <label htmlFor="receiverName" className="topic-input-label"><span>Recipient:&nbsp;</span></label>
                    <input type="text" id="receiverName" className="topic-input" name="receiverName" value={receiverName} onChange={e => setReceiverName(e.target.value)}></input>
                </div>
                <div className="topic-wrapper">
                    <label htmlFor="topic" className="topic-input-label"><span>Topic:&nbsp;</span></label>
                    <input type="text" id="topic" className="topic-input" name="topic" onChange={e => setTopic(e.target.value)}></input>
                </div>
                <div className="contact-message-wrapper">
                <textarea className="contact-message-input" placeholder="Write your message here" onChange={e => setContent(e.target.value)}></textarea>
                </div>
                    <button className="send-message-btn expand primary-btn">Send Message</button>
            </form>
        </div>
    )
}

export default Contact;