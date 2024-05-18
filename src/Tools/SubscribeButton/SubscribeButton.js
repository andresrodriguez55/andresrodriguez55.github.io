import React from "react";
import "./SubscribeButton.css";

export default function SubscribeButton()
{
    const [subscriptionMessage, setSubscriptionMessage] = React.useState("Thank you for subscribing!");
    const [subscriptionButtonMessage, setSubscriptionButtonMessage] = React.useState("Subscribe");

    const postSubscription = async()=>
    {
        setSubscriptionButtonMessage("Loading");

        const email = {email: document.getElementById("subscribeEmailInput").value};
        const urlToFetch = process.env.REACT_APP_BACKEND_URL + "SuscribedEmail";
        await fetch((urlToFetch), {method: "POST", headers: {'Content-Type': "application/json"},
            body: JSON.stringify(email) }).then(async(response)=>
        {
            if(response.ok)
            {
                document.getElementById('subscribeForm')?.classList.add('done');
            }
            else
            {
                const message = await response.text();
                if(message.substring(0, 9) === 'Duplicate')
                {
                    document.getElementById('subscribeForm')?.classList.add('done');
                    setSubscriptionMessage("You are already subscribed!");
                }
                else
                {
                    document.getElementById('subscribeEmailInput').reportValidity();
                    setSubscriptionButtonMessage("Subscribe");
                }
            }
        }).catch(e => setSubscriptionMessage("Server error..."));     
    };

    const printSubscribeButton = ()=>
    {
        return (
            <div class="subscribeButtoncontainer">
                <h4>Subscribe to receive new posts announcements</h4>
                <div class="subscribeButtonContent">
                    <form class="subscribeForm" id="subscribeForm">
                        <input class="subscribeEmailInput" id="subscribeEmailInput"
                            type="email" placeholder="subscribe@me.now" onKeyPress={(e)=>{
                                if(e.code === 'Enter')
                                {
                                    postSubscription();
                                }
                            }}/>
                        <button class="subscribeButton" type="button" id="subscribeButton" onClick={()=>postSubscription()}>
                            <span class="before-submit">{subscriptionButtonMessage}</span>
                            <span class="after-submit">{subscriptionMessage}</span>
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (printSubscribeButton());
}