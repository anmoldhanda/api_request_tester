const request_jsonbody_textarea_container = document.querySelector(".request-jsonbody-textarea-container");
const add_delete_query_parameters_container = document.querySelector(".add-delete-query-parameters-container");
const api_response_submission_btn = document.querySelector(".api-response-submission-btn");
const json_radiobtn = document.getElementById("json-radiobtn");
const query_parameters_radiobtn = document.getElementById("query-parameters-radiobtn");

// ================================== set the initial value of all_query_parameters_count to 0 and we'll increment it as the user clicks on the plus icon ==================================
let all_query_parameters_count = 0;
// ================================ utility function to get keyvalue pairs element from string ================================
function create_insert_keyvalue_pairs_to_dom(new_keyvalue_pair_element) {
    let divtag = document.createElement("div");
    divtag.innerHTML = new_keyvalue_pair_element;
    console.log("created a div and set its html the key value pair elements group");
    console.log(divtag.firstElementChild);
    return divtag.firstElementChild;
}

const yes_addmore_query_parameters = document.querySelector(".yes-addmore-query-parameters");
const overlay_notification_container = document.querySelector(".overlay-notification-container");
const notification_text = document.querySelector(".notification-text");
yes_addmore_query_parameters.addEventListener("click",()=>{
    notification_text.innerHTML = "are you sure you want to add more query parameters";
    yes_addmore_query_parameters.textContent = "yes";
    overlay_notification_container.style.display = "none";
})

// ====================================================== if the user clicks on json radio btn show the json body container and hide the query parameter container ======================================================
json_radiobtn.addEventListener("click",()=>{
    request_jsonbody_textarea_container.classList.remove("showhide-jsonbody-textarea-container");
    add_delete_query_parameters_container.classList.remove("showhide-query-param-container");
})

// ====================================================== if the user clicks on the query parameter radio btn hide the json body container and show the query parameter container ======================================================
query_parameters_radiobtn.addEventListener("click",()=>{
    request_jsonbody_textarea_container.classList.add("showhide-jsonbody-textarea-container");
    add_delete_query_parameters_container.classList.add("showhide-query-param-container");
})

// ============================== if the user clicks on the plus button add more query parameters ==============================
const addmore_query_parameter_btn = document.getElementById("addmore-query-parameter-btn");
const query_parameters_container = document.querySelector(".query-parameters-container");
addmore_query_parameter_btn.addEventListener("click",(e)=>{
    let key_value_pair_element = `<div class="query-parameters-container">
    <div class="query-parameters-key-container">
    <input type="text" name="query-parameters-key" class="input_query_parameters_key" id="input-query-parameters-key-${all_query_parameters_count + 2}" placeholder="Enter your key">
    </div>
    <div class="query-parameters-value-container">
    <input type="text" name="query-parameters-value" class="input_query_parameters_value" id="input-query-parameters-value-${all_query_parameters_count + 2}" placeholder="Enter your value">
    </div>
    <button class="delete-query-parameter-btn" type="button">-</button>
    </div>`;
    // ============================== all_query_parameters_count + 2 is that because one is already present in the dom which is 1st element and then set the addmore_queryparameter_btn to 0 as initial value so that's why 0 & 1 indexes are already taken that's why we set this to +2 ==============================
    let keyvalue_pair = create_insert_keyvalue_pairs_to_dom(key_value_pair_element);
    add_delete_query_parameters_container.appendChild(keyvalue_pair);
    let delete_query_parameter_btn = document.getElementsByClassName("delete-query-parameter-btn");
    for(let single_query_parameter_delete_btn of delete_query_parameter_btn) {
        single_query_parameter_delete_btn.addEventListener("click",(e)=>{
            // ============================== if we click on the iterated element of singledeletebtn this will delete its parent element from DOM ==============================
            e.target.parentElement.remove();
        })
    }
    // ============================== we want to keep the track of all the query parameters count that's why we've put ++ so we can see how much the user has added the key value pair elements to the DOM ==============================
    let query_parameters_length = all_query_parameters_count++;
    console.log(query_parameters_length);
    if(query_parameters_length == 3) {
        // ============================== it has reached 5 because 1 is already written in html file and its initial value is set to 0 and if the user clicks on plus icon then it will add as initial value + 2 that's why it's said to be reached as 3rd indexed element ==============================
        console.log("5 query parameters already added to the DOM");
        overlay_notification_container.style.display = "block";
    }
})

const input_api_response_textarea = document.getElementById("input-api-response-textarea");
api_response_submission_btn.addEventListener("click",(e)=>{
    input_api_response_textarea.placeholder = "Please wait fetching response from api....";
    // ============================== show please wait message in the response box as we are fetching the response from the api so the user wait for sometime ==============================
    const input_url = document.getElementById("input-url");
    const request_type_radio_btns = document.querySelector('input[name="request-type-radio-btns"]:checked');
    const content_type_radio_btns = document.querySelector('input[name="content-type-radio-btns"]:checked');
        let user_input_data_object = {};
        if(content_type_radio_btns.value === "queryparameters") {
            // ============================== if the user has selected the content type of query parameters instead of json body then make a object and store the user entered data into a JSON object ==============================
            for(let index = 0; index<all_query_parameters_count+1; index++) {
                if(document.getElementById("input-query-parameters-key-"+(index+1)) != undefined) {
                    let key = document.getElementById("input-query-parameters-key-"+(index+1)).value;
                    let value = document.getElementById("input-query-parameters-value-"+(index+1)).value;
                    user_input_data_object[key] = value;
                }
            }
            console.log("query parameters");
            user_input_data_object = JSON.stringify(user_input_data_object);
            // console.log(user_input_data_object);
        }
        else {
            // ============================== if the user's selected the json body to send the data in directly json format ==============================
            const input_request_jsonbody_textarea = document.getElementById("input-request-jsonbody-textarea");
            user_input_data_object = input_request_jsonbody_textarea.value;
            // console.log(user_input_data_object);
        }
// ============================== log all the values in console for debugging ==============================
console.log("url " + input_url.value);
console.log("request type " + request_type_radio_btns.value);
console.log("content type " + content_type_radio_btns.value);
console.log(user_input_data_object);
if(request_type_radio_btns.value === "get") {
    // ====================================================== get request ======================================================
    fetch(input_url.value, {
        method: "GET",
    }).then((response)=>{
            return response.json();
    }).then((getrequest_apidata)=>{
        console.log(getrequest_apidata);
        input_api_response_textarea.value = JSON.stringify(getrequest_apidata);
        overlay_notification_container.style.display = "none";
    }).catch((error)=>{
        console.log(error);
        overlay_notification_container.style.display = "block";
        notification_text.innerHTML = "some network issue happened";
        yes_addmore_query_parameters.textContent = "ok";
    })
}
else {
    // ====================================================== post request ======================================================
    fetch(input_url.value, {
        method: "POST",
        headers: {"content-type": "application/json" },
        // ============================== post request data is our body's key which is our object which the user will send and it doesn't care if the user sends using json body or query parameters ==============================
        body: user_input_data_object
    }).then((response)=>{
        return response.json();
    }).then((postrequest_apidata)=>{
        console.log(postrequest_apidata);
        input_api_response_textarea.value = JSON.stringify(postrequest_apidata);
        overlay_notification_container.style.display = "none";
    }).catch((error)=>{
        console.log(error);
        overlay_notification_container.style.display = "block";
        notification_text.innerHTML = "some network issue happened";
        yes_addmore_query_parameters.textContent = "ok";
    })
}
})