# This is an Open Source project contributed to Samsung Bixby Open Source Challenge: https://bixby-showcase.bemyapp.com

The projects shows how to connect to a security system and show and filter events of interest. For example: "show all cars detected last Sunday morning" or "show 5 events with people detected today" and etc...

Additionaly it allows to search cameras by name and (in the future) by location.

Additionally (in the future) it would cross-reference cameras and events to allow queries such as: "show buses from cameras in Seattle".

In the future, it might be able to answer more detailed natural language queries, such as "which camera saw a man in red or orange coat loitering yesterday morning". 

Control camera: "pan gate camera to the left", "send this event to my inbox", ...

This version is a prototype. 

1. The time-based queries are not implemented as I could not yet find time parser for ISO timestamps.

2. The events and cameras are not live to avoid exposing the live servers till the security model is validated. Instead the lists of events and cameras are hardcoded. This will actually simplify testing, as this is now self-contained capsule that does not need the server access.

3. Authentication and authorization are also not completed.

4. The images in the events are live.

5. More functionality (multi-camera support, email events, support for TV and etc) will be added in the future if the project proves business value.

Folder structure:
code/event and code/camera  -  converts the mock lists of events and cameras to bixby model

code/lib/event and /camera  -  hardcoded mock events and cameras

models/concepts/event and /camera	 - concept models for events, cameras and shared (such as Count)

models/actions/event and /camera - find events and find cameras actions

resources/en-US/layout/macro - summary and detail layout templates

resources/en-US/vocab  - vocabulary, dialogs, view and endpoints
resources/en-US/dialog
resources/base/view
resources/base


In order to test the capsule: open the com.dcomplex capsule in Bixby IDE