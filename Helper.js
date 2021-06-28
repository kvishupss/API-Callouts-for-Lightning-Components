({
    getResponse: function(component, jungle) {
        // create a server side action.       
        var action = component.get("c.getCalloutResponseContents");
        // set the url parameter for getCalloutResponseContents method (to use as endPoint) 
        action.setParams({
            "url": 'https://th-apex-http-callout.herokuapp.com/'+ jungle
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") 	{
                // set the response(return Map<String,object>) to response attribute.      
                component.set("v.response", response.getReturnValue());
 
                // get the all rates from map by using key              
                var getAllNames = component.get("v.response")['animals'];
                var animalsList = [];
                // play a loop on Animal object 
                for (var key in getAllNames) {
                    // push all Animal with there Name in animalList variable.        
                    animalsList.push(key + ' = ' + getAllNames[key]); 
                }
                // set the animalList to ListOfAnimal attribute on component.           
                component.set("v.ListOfAnimals", animalsList);
               
            }
        });
 
        $A.enqueueAction(action);
    },
})
