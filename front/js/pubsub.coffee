jQuery = require 'jquery'

topics = {}

pubsub = ( id ) ->
  throw new Error('pubsub need an  id') unless id?
  topic = topics[id]
  unless topic?
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire
      subscribe: callbacks.add
      unsubscribe: callbacks.remove
    }
    topics[id] = topic
    return topic

  topic

module.exports = pubsub
