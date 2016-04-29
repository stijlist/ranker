(ns ranker.core)
(enable-console-print!)
(.timeEnd js/console "cljs load")

(.. (js/require "electron") 
  -ipcRenderer 
  (on "stdin" (fn [e msg] (println msg))))

(.timeEnd js/console "start")
