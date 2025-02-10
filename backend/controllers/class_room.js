const {class_room, instructor, course}=require("../models")


const getAllClass= async(req,res)=>{

    class_room.findAll()
    .then((classes)=>{
        res.send(classes)
        console.log(classes)
    }
        
    )
    .catch((err)=>{
        if(err){
            console.log(err)
        }
    })
}
const getOneClass=(req,res)=>{
    const class_id=req.params.id

    class_room.findOne({where:{id:class_id}})
    .then((classes)=>{
        res.send(classes)
        console.log(classes)


    }
        
    )
    .catch((err)=>{
        if(err){
            console.log(err)
        }
    })
}
const getByCourse=(req,res)=>{
    console.log("Im in here")

    const {id}=req.params
    class_room.findAll({where:{course_id:id}})
    .then((classes)=>{
        res.send(classes)
        console.log(classes)
    })
}

const createClass = async (req, res) => {
    const body = req.body;
    const className = body.className;
    const instructorName = body.selectedInstructor;
    const courseName = body.selectedCourse;

    try {
        const previousClassId = await class_room.max('id');

        
        const idTagValue = previousClassId !== null ? `CLS${1000 + previousClassId}` : 'CLS1000';
        const fullClass = `${idTagValue} ${className}`;
        const instId = await instructor.findOne({
            where: {
                full_identification: instructorName
            },
            attributes: ['id']
        })

        const findCourse = await course.findOne({
            where: {
                full_identification: courseName
            },
            attributes: ['id']
        })
        await class_room.create(
            {
                name: className,
                instructor_id: instId.id,
                course_id: findCourse.id,
                id_tag: idTagValue,
                full_identification: fullClass
            }
        )
        res.json({ success: true })
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "error in creating class" }, 500)
    }
}


const updateClass = (req, res) => {
    const { className, instructorName, courseName,id_tag} = req.body;
    const identification=fullIdentification.split(" ")
    fullIdentification=identification[0]+" "+courseName
    
    class_room.update(
        {
          class_name: className,
          courseName: courseName,
          instructorName:instructorName,
          full_Identification:fullIdentification
  
        },
  
        { where: { id: req.params.id } }
      )
      .then((course) => {
        console.log(course);
        console.log(req.params.id);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

module.exports={
    getAllClass,
    getOneClass,
    getByCourse,
    createClass,
    updateClass,
}