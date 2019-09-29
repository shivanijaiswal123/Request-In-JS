console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ WELCOME TO THE SARAL COURSE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
const raw_input=require('readline-sync').question;

function getApi(url){
    const axios = require('axios')
    var response=axios.get(url)
    return response
}

function mainFunction(){
    var mainData
    var user_chioce
    var firstUrl="http://saral.navgurukul.org/api/courses"
    var firstData=getApi(firstUrl)
    
    var promise1 = new Promise(function(resolve,reject){
        resolve(firstData)
    });

    ids_data=[];
    promise1.then(function(url){
        var data1=url.data["availableCourses"];
        console.log("------------------------------------------All Courses--------------------------------------------------")
        for (var i in data1){
            var courseName=data1[i]["name"];
            ids=data1[i]["id"];
            ids_data.push(ids)

            console.log(i, courseName ,ids)
        }return ids_data;
    }).then((idList) =>{
            console.log("-----------------------------------YOU CAN GET COURSE ID FOR EXTRACTING EXERCISE OF COURSE---------------------------------")
            var user_input=raw_input("Enter no which course you want:-")
            var id=idList[user_input];
            var secondUrl= firstUrl +"/" + id + "/" + "exercises"
            var res=getApi(secondUrl)
            return res

        }).then((res) =>{
            var main_list=[]
            var exerciseId=[]
            var slug_list=[]
            console.log("----------------------------------------EXERCISES-----------------------------------------------")
            data=res["data"]["data"]
            for(var i=0; i<data.length;i++){
                
                console.log(i + ". " + data[i]["name"]+"\n")
                slug_list.push(data[i]["slug"])
            
            
                exerciseId.push(data[i]["id"])
            
                
                childExercises=(data[i]["childExercises"])
                for(var j=0;j<childExercises.length;j++){
                    console.log("           "+j + ". " + childExercises[j]["name"])
                }
            }
            main_list.push(slug_list)
            main_list.push(exerciseId)
            return(main_list)

            }).then((main_list)=>{
                var child_slug=[]
                input=raw_input("Enter any course:-")
                console.log(data[input]["name"]+"\n")
                childExercises=(data[input]["childExercises"])
                user_chioce=input;

                for(var j=0;j<childExercises.length;j++){
                    console.log("           "+j + ". " + childExercises[j]["name"])
                    child_slug.push(childExercises[j]["slug"])

                }
                
                main_list.push(child_slug)
                var slug=main_list[0][input]
                var id=main_list[1][input]
                var thirdUrl= firstUrl+"/" +id + "/exercise/getBySlug?slug="+ slug
                mainData=main_list
                return thirdUrl

                }).then((thirdUrl)=>{
                    var respo=getApi(thirdUrl)
                    return respo

                    }).then((respo)=>{
                        var cont=respo["data"]
                        console.log(cont["content"])
                    }).then(()=>{
                        
                        input=raw_input("enter any no.")
                        slugs=mainData[2][input]
                        var child_id=mainData[1][user_chioce]
                        childUrl= firstUrl+"/" +child_id + "/exercise/getBySlug?slug="+ slugs
                        var respon=getApi(childUrl)
                        return(respon)

                    }).then((respon)=>{
                        var conte=respon["data"]
                        console.log(conte["content"])

                    })

}
mainFunction();
                    
                


    
        
