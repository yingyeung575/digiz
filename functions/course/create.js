const { faunaFetch } = require('./utils/fauna');

exports.handler = async (event) => {
 // const { user } = JSON.parse(event.body);

await faunaFetch({
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
    title: 'Some test title',
    tag: 'some tag',
    video: '<p>Some HTML</p>',
    content: 'some content'
  },
});


  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};