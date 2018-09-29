# This is an Open Source project contributed to Samsung Bixby Open Source Challenge: https://bixby-showcase.bemyapp.com

The projects shows how to connect to a security system and show and filter events of interest. For example: "show all cars detected last Sunday morning" or "show 5 events with people detected today" and etc...

In the future, it might be able to answer more detailed natural language queries, such as "which camera saw a man in red coat loitering this morning". Control camera: "pan gate camera to the left", "send this event to my inbox", ...

This version is a prototype. 
1. The time-based queries are not implemented as I could not yer find time parser for ISO timestamps.
2. The events are not live to avoid exposing the live servers till the security model is validated. Instead the list of events is hardcoded.
3. Authentication and authorization are also not completed.
4. The images in the events are live.
5. More functionality (multi-camera support, email events, support for TV and etc) will be added in the future if the project proves business value.

Folder structure:
code/FindEvents.js  -  converts the list of events to bixby model
code/lib/events.js  -  hardcoded test sampling of events

models/concepts/Count.model.bxb		- concept models
models/concepts/Description.model.bxb
models/concepts/Timestamp.model.bxb
models/concepts/Name.model.bxb
models/concepts/EventName.model.bxb
models/concepts/EventType.model.bxb
models/concepts/Event.model.bxb

models/actions/FindEvents.model.bxb - find events action

resources/en-US/layout/macro - summary and detail layout templates

resources/en-US/vocab  - vocabulary, dialogs, view and endpoints
resources/en-US/dialog
resources/base/view
resources/base


In order to test the capsule: open the com.dcomplex capsule in Bixby IDE