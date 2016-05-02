(ns ranker.core
  (:require [clojure.string :as string]
            [sablono.core :as sablono]))

(enable-console-print!)
(.timeEnd js/console "cljs load")

(def state (atom []))

(defn append-msg-to-state [event msg]
  (swap! state concat (string/split msg "\n"))
  (println @state))

(.. (js/require "electron") 
  -ipcRenderer 
  (on "stdin" append-msg-to-state))

(.timeEnd js/console "start")
