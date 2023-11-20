/*redirect url change for example ?id=1 */
function redirect_change_parameter (myparam , myval) {
    var url_main = window.location.href;
    var url = new URL(url_main);
    var search_params = url.searchParams;
    search_params.set(myparam, myval);
    /* change the search property of the main url */
    url.search = search_params.toString();
    /* the new url string */
    var new_url = url.toString();
    location.replace(new_url);
}


function check_in_page (page_name) {
    var url_main_index = window.location.href;
    var in_index = url_main_index.search(page_name);
    if(in_index < 1) {
      in_page = false;
    }else{
      in_page = true;
    }
    return in_page;
 }



  