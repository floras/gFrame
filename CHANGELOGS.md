v0.1.03a
===

 

v0.1.02pa
===

*  [NEW] gFrame.alive property for checking gFrame is alive 
*  [NEW] using pushState (HTML5)
*  [NEW] gFSETUP for main window (script, style)
*  [NEW] gFrame.once
*  [NEW] added dummy function
*  [BUG] left -> right 
*  [BUG] IE6 horizontal scroll fix
*  [DEL] gFrame.memory 
*  [DEL] gFrame.onLoad 
*  [BUG] ALL IE BUG URL FIX WITHOUT TRICK
*  [DOC] EXAMPLE (BLOGGER)



v0.1.01pa
===

*   gFrame is instantly inserted in the frame. (you don't have to access top window for getting gFrame obejct);
*   gLayer['debug']  : z-index -> 1000
*   ignore accessing non-existed id : gFrame.hide(id), gFrame.opacity(id, value), .... 
*   [NEW] gFrame(id) : it returns gFrame instance;
*   [NEW] _gFrame instance_ is available : _gFrame_.hide(), _gFrame_.hide(), _gFrame_.show(), ...
*   [NEW] gFrame events : gFrame.ready(fun, global), gFrame.load(fun, global), gFrame.unload(fun, global);
*   [CHG] gFrame.hide doesn't use css display any longer.
*   [NEW] gFrame.toBack, gFrame.toFront, gFrame.zIndex
*   [NEW] gFrame.exit, gFrame.start
*   [DEL] gFrame.min.js, gFrame.pack.js 