declare global {
    interface Window {
      onSpotifyIframeApiReady(IFrameAPI: any):void;
      EmbedController: {
        loadUri(uri: string):void;
        play():void;
      }
    }
  }