import React, { useState } from 'react';
import GetAllSubscribedEmailDto from '../../../data/dto/response/get/GetAllSubscribedEmailDto';
import './SubscribeComponent.css';

const SubscribeComponent = ({ apiSubscribedEmailService }) => {
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('Thank you for subscribing!');
    const [isDone, setIsDone] = useState(false); 

    const postSubscription = async () => {
        if(isDone){
            return;
        }

        try {
            const subscribedEmailDto = GetAllSubscribedEmailDto.email(email);  
            await apiSubscribedEmailService.postSubscribedEmail(subscribedEmailDto);
        } catch (error) {
            console.error('Failed to post subscription:', error.message);
            console.log(error)
            setResponseMessage(error.message);
        } finally {
            setIsDone(true); 
        }
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            postSubscription();
        }
    };

    const handleClick = () => {
        postSubscription();
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="subscribeButtoncontainer">
            <h4>Subscribe to receive new posts announcements</h4>
            <div className="subscribeButtonContent">
                <form className={`subscribeForm ${isDone ? 'done' : ''}`} id="subscribeForm">
                    <input
                        className="subscribeEmailInput"
                        id="subscribeEmailInput"
                        type="email"
                        placeholder="subscribe@me.now"
                        onChange={handleChange}
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        required
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="subscribeButton"
                        type="button"
                        id="subscribeButton"
                        onClick={handleClick}
                    >
                        <span className="before-submit">Subscribe</span>
                        <span className="after-submit">{responseMessage}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubscribeComponent;
