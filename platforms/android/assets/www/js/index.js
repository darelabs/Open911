/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    
    last_known_pos: null,
    geocoder: new google.maps.Geocoder(),
    set_last_known_pos: function (last_known_pos) {
        var pos = last_known_pos;
        alert(pos);
        
        var lat = parseFloat(pos.coords.latitude);
        var lng = parseFloat(pos.coords.longitude);
        var latlng = new google.maps.LatLng(lat, lng);
        
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                var arrAddress = results[0].address_components;
                // iterate through address_component array
                $.each(arrAddress, function (i, address_component) {
                  if (address_component.types[0] == "locality") {
                    console.log(address_component.long_name); // city
                    alert(address_component.long_name);
                    return false; // break
                  }
                });
              } else {
                alert("No results found");
              }
            } else {
              alert("Geocoder failed due to: " + status);
            }
        });
        
    },
    
    // Application Constructor
    initialize: function() {
        this.bindEvents(); 
        navigator.geolocation.getCurrentPosition(this.set_last_known_pos);
        setTimeout(function(){ alert('Posting form ' + app.last_known_pos); }, 10000); 
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
    }
};
