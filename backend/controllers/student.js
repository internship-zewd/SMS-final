const {student,class_room}=require('../models')

const getAllStudent=(req,res)=>{
    student.findAll()
    .then(( student)=>{res.send(student)
       
    console.log( student)})
    .catch((err)=>{
        if(err){
            console.log(err);

        } 
    }); 
   

}

const getOneStudent=async(req,res)=>{
    const id=req.params.id
    await student.findOne({where:{id:id}})
    .then((student)=>{res.send(student)})
    .catch((err)=>{
        if(err){
            console.log(err)
        }
    })}

const getStudentByClass=async(req,res)=>{
    const class_id=req.params.id
    await student.findAll({where:{class_id:class_id}})
    .then((students)=>{
        res.send(students)
        console.log(students)

    })
    .catch((err)=>{
        if(err){
            console.log(err)
        }
    })}


const createStudent=async(req,res)=>{
    const {username,email,phonenumber,gender,course,classs,paymentStatus,dob}=req.body
    
    const previousId= await student.max('id')
    const idTag= previousId!==null? `STU${1000+previousId}`:`STU${1000}`
    const fullIdentification=idTag+" "+username
    // Mailer(email)
    student.create({
        
    
        id_tag:idTag,
        full_name:username,
        full_identification:fullIdentification,
        email:email,
        phonenumber :phonenumber,
        gender : gender,
        course : course,
        paymentStatus : paymentStatus,
        dob : dob,
        course_id:course,
        class_id:classs
        
            
        })
        .then(console.log(res)
            )
        .catch((err)=>{
            if(err){
                console.log(err)
            }})
            res.send('insert');
    }


const updateStudent=async(req,res)=>{
    const {fullName,email,phonenumber,gender,paymentStatus,course,classs,dob,idTag}=req.body   


    const fullIdentification=idTag+" "+fullName
    
    student.update(
        {
            full_name:fullName,
            class_id:classs,
            email : email,
            phonenumber : phonenumber,
            gender : gender,
            paymentStatus : paymentStatus,
            course_id : course,
            dob : dob,
            full_identification:fullIdentification

        },

       { where:{id:req.params.id}})
    .then(( student)=>{
        console.log( student)
        console.log(req.params.id)
        res.send(student)
    })
    .catch(err=>{
        if(err)
        {console.log(err)}
    })}

const deleteStudent=(req,res)=>{
    const stud_id=req.params.id
    student.destroy({where:{id:stud_id}})       
    .then(res.send())
    .catch((err)=>{
        if(err){
            console.log(err)
        }
    })}


    const getStudentAndClass=(req,res)=>{
        let studentByClass=[]
        student.findAll()
        .then((students)=>{
            const studentsWithClass=[]
            students.forEach((stud)=>{
                let className=""
                let student=stud.dataValues
                const Class=stud.dataValues.class_id
                class_room.findOne({where:{id:Class}})
                .then((classInfo)=>{
                    console.log(classInfo )
                   className= classInfo.dataValues.full_identification
                   student.classFullIdentification=className
                   studentsWithClass.push(stud.dataValues)
               console.log(stud)
    

                })
                .catch((err)=>{if(err){console.log(err)}})
                
               


            })
            res.send(studentsWithClass)



        })
        .catch((err)=>{if(err){console.log(err)}})

    }

module.exports={
    getAllStudent,
    getOneStudent,
    createStudent,
    updateStudent,
    getStudentByClass,
    deleteStudent,
    getStudentAndClass
}


