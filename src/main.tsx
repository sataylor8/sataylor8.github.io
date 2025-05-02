import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Globals.ts";


window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
  const element = document.getElementById('SpotifyPlayer');
  const options = {
      uri: 'spotify:track:6TMXUFy1zNN5JqNhoM0Odw',
      height: '80',
      width: '400',
    };
  const callback = (EmbedController: any) => {
    window.EmbedController = EmbedController;
  };
  IFrameAPI.createController(element, options, callback);
};



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
