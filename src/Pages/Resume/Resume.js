import React from 'react';
import "./Resume.css";
import { FadeLoader } from 'react-spinners';
import { Document, Page, pdfjs } from "react-pdf";
import SubscribeButton from '../../Tools/SubscribeButton/SubscribeButton';

export default function Resume()
{
    return (
        <div >
            <iframe src="https://drive.google.com/file/d/1dHKQ3hNzicS4hGO1rQsTq59S1jwDyDPL/preview#view=fit&toolbar=0&navpanes=0" 
                className='resumePDF'
                allow="autoplay">
            </iframe>
            {
                SubscribeButton()
            }
        </div>
    );
}