import React from "react";
import { useLocation } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { prefixURLBackend } from '../../Tools/PrefixURLBackend/PrefixURLBackend';

export default function Unsubscribe()
{
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const suffixUrl = useLocation().pathname;
    const informationUrl=suffixUrl.split("/");
    const email=informationUrl[2];

    React.useEffect(async()=>
    {
        await deleteSubscription(email);
    }, []);

    const deleteSubscription=async(email)=>
    {
        const urlToFetch = prefixURLBackend + "SuscribedEmail/" + email;
        await fetch((urlToFetch),
        {
            method: "DELETE",
        }).then(async(response)=>
        {
            if(!response.ok)
                setError(true);
            setLoading(false);
        }).catch(e => alert(e));
    }

    if(error)
    {
        return(
            <h6 style={{fontSize:"150%", fontWeight:"100"}} align="center">The email does not exist...</h6>
        ); 
    }

    if(loading)
    {
        return (
            <div style={{margin: "30px auto 120px auto", textAlign: "center"}}>
                <FadeLoader/>
            </div>
        );
    }

    return (
        <h6 style={{fontSize:"150%", fontWeight:"100"}} align="center">Unsubscribed :(</h6>
    );
}