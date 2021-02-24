This application is used to compare the geographic demographics of two neighborhoods in Denver to the values of the entire city itself.
It can be launched by cloning this repository, opening a terminal in the base folder and running npm start, then navigating to localhost:300.
The Homepage file contians the majority of the information. It houses the other components of the application.
The constants holds PROPERTIES_LIST, which has the properties listed on the example, with how they are displayed as 'display' and the key in the geojson file as 'key'. If you want to include another property, simply add it to this list.
A StatsRow displaysw the data of the selected property for Denver and the one or two other neighborhoods selected.
Utilities holds the function for grabbing the data from the geojson file. If another file is wanted, this will need to be changed.

A shortcoming of this application is that it is accessing the 'neighborhood_name' property, not the 'neighborhood_key' to identify the neighborhood. This was because I was already displaying the neighborhood_name and wanted to only use that one if possible, but I ended up needing to use neighborhood_key for something, and therefore should've used it an the identifier as well.