$(document).ready(function () {
    count=0;
    $('#member_insert_btn').click(function () {
        const name=$('#name').val();
        const user_id=$('#user_id').val();
        const comments=$('#comments').val();
        const send_params={
            name,
            user_id,
            comments
        };
        alert(JSON.stringify(user_id));
        $.post("/member_insert",send_params,function (data,status) {
            
            const parsed_data=JSON.parse(data);
            $('#result_div').html(`<h1>${parsed_data.msg}</h1>`);
        });     
    });

    $('#login_btn').click(function () {        
        const login_user_id=$('#login_user_id').val();        
        const send_params={           
            login_user_id
        };        
        $.post("/login",send_params,function (data,status) {            
           try{
               alert(JSON.parse(data).msg);  
               $('#login_user_id').val()="";   
           }catch(err){
               window.location.reload(true);
           }
            
        });        
    });

    $('#logout_btn').click(function () {                  
        $.get("/logout",function (data,status) {
            window.location.reload(true);
        });        
    });

    //carBasicInfoSearch_btn
    $('#carBasicInfoSearch_btn').click(function () {        
        const searchType=$('#searchType').val();    
        const car_num_input=$('#car_num_input').val();     
        const send_params={           
            searchType,
            car_num_input
        };        
        $.post("/search_carInfo",send_params,function (data,status) {
            //alert(data+":"+status);
            const parsed_data=JSON.parse(data);   
            
            
            let printData=`<table border=1 style='background-color:white;text-align:center;font-weight: bold;width:300px;height:300px'>`;
            for(key in parsed_data.msg) {
                printData += `<tr><td style='background-color:lightgray;'>${key}</td><td style='color:blue'>${parsed_data.msg[key]}</td></tr>`;
            }
            printData += '</table>';         
            $('#carBasicInfoSearch_div').html(`${printData}`);
           
        });        
    });
});