const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {

   // Only allow POST
   if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
        headers: {
          Allow: 'Get',
        },
      }
    }

    const { action,data } = JSON.parse(event.body);

    if (action == 'create'){

      const result = await faunaFetch({
        query: `
          mutation ($title: String!, $tag: String,$video: String,$content: String,) {
            createCourse(
              data: { 
                title: $title,
                tag: $tag, 
                video: $video,
                content: $content
              }) {
              title
              tag
              video
              content
            }
          }
        `,
        variables: {
          title: data.title,
          tag: data.tag,
          video: data.video,
          content: data.content
        },
      });      

    }

    if (action == 'selectall'){

      const result = await faunaFetch({
        query: `
          query FindAllCourse {
            allCourse {
              data {
                _id
                title
              }
            }
          }
        `,
        variables: {
       
        },
      });      

      console.log(result.data.allCourse);


    }

    if (action == 'selectone'){

      const result = await faunaFetch({
        query: `
          query findCourseByID($courseid: ID!){
            findCourseByID(id:$courseid){
              title,
              tag,
              video,
              content
            }
          }
        `,
        variables: {
          courseid: data
        },
      });      

      console.log(result.data.findCourseByID);


    }

    if (action == 'update'){

      result = await faunaFetch({
        query: `
          mutation updateCourse($courseid: ID!, $title: String!, $tag: String,$video: String,$content: String){
            updateCourse(
              id: $courseid
              data:{
                title: $title,
                tag: $tag, 
                video: $video,
                content: $content
              }
            )
            {
              title
              tag
              video
              content
            }
          }
        `,
        variables: {
          title: data.title,
          tag: data.tag,
          video: data.video,
          content: data.content,
          courseid: data.courseid
        },
      });   
   

    }

    if (action == 'delete'){

      const result = await faunaFetch({
        query: `
          mutation deleteCourse($courseid: ID!){
            deleteCourse(
              id: $courseid
          
            ){
              title
            }
          
          }
        `,
        variables: {
          courseid: data
        },
      });      

    }


  return {
    statusCode: 200,
    body: JSON.stringify(""),
  };
};