const checkboxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLable = document.querySelector('.error-lable');
const progressValue = document.querySelector('.progress-value');
const progressbar = document.querySelector('.progress-bar')
const progresslable = document.querySelector('.progress-lable')

const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]



const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
  first:{
    name:'',
    completed:false,
  },
  second:{
    name:'',
    completed:false,
  },
  third:{
    name:'',
    completed:false,
  },
}

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

progressValue.style.width = `${completedGoalsCount / 3 * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/ 3 completed`


checkboxList.forEach((checkbox) => {

  checkbox.addEventListener('click', (e) => {
    const allGoolsAdded = [...inputFields].every(function (input) {
      return input.value
    })

    if (allGoolsAdded) {
      checkbox.parentElement.classList.toggle('completed');
      const inputID = checkbox.nextElementSibling.id
      allGoals[inputID].completed = !allGoals[inputID].completed

      completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
      progresslable.innerText = allQuotes[completedGoalsCount]

      progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/ 3 completed`
      progresslable.innerText = allQuotes[completedGoalsCount]



      // console.log(completedGoalsCount)
      localStorage.setItem('allGoals', JSON.stringify(allGoals))


    } else {
      progressbar.classList.add('show-error')
    }

  });


});


inputFields.forEach((input) => {
  // console.log(allGoals[input.id])

  input.value = allGoals[input.id].name

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add('completed')

  }


  input.addEventListener('focus', () => {
    progressbar.classList.remove('show-error');
  })

  input.addEventListener('input', (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name
      return
  
    }
    allGoals[input.id].name = input.value
      
    

    localStorage.setItem('allGoals', JSON.stringify(allGoals))

  })
})