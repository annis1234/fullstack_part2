const Header = ({ course }) =>
    <h1>{course}</h1>

const Total = ({parts}) => {

  const total = parts.reduce((s, p) => s + p.exercises, 0)

  return (
  <div>
    <b>total of {total} exercises</b>
  </div>

  )
}

const Part = ({part}) => 
  <div>
    {part.name} {part.exercises}
  </div>

const Content = ({parts}) => {

  return (
    <div>
      {parts.map((part) => <Part part= {part} key = {part.id}/>)}
      <Total parts = {parts} />
    </div>
  )

}

const Course = ({course}) => {

  return(
    <div>
    <Header course = {course.name}/>
    <Content parts = {course.parts} />
    </div>
  )

}

export default Course