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
*   [New] gFrame(id) : it returns gFrame instance;
*   [New] _gFrame instance_ is available : _gFrame_.hide(), _gFrame_.hide(), _gFrame_.show(), ...
*   [New] gFrame events : gFrame.ready(fun, global), gFrame.load(fun, global), gFrame.unload(fun, global);
*   [Changed] gFrame.hide doesn't use css display any longer.
*   [New] gFrame.toBack, gFrame.toFront, gFrame.zIndex
*   [New] gFrame.exit, gFrame.start
*   [Deleted] gFrame.min.js, gFrame.pack.js 