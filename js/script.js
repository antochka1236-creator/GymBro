const formStart = document.getElementById('start-form')

if (formStart){
formStart.addEventListener('submit', (e) =>{
    e.preventDefault()

    window.location.href = "login.html"
})
}

const formName = document.getElementById('name-form')
const nameInput = document.getElementById('nombre')

if (formName){
    formName.addEventListener('submit', (e) =>{
        e.preventDefault()

      isUserExist(nameInput.value)
    })
}

const regexp  =  /^[a-zA-ZÁ-ÿ\s]{2,20}$/


const errorName = document.getElementById('error-name')

// Funcion para validar nombre
function isNameValid(input){
     if (regexp.test(input)){
         errorName.textContent = ''
         return true
     }else{
        errorName.textContent = 'Introduce un nombre válido (solo letras y espacios, 2-20 caracteres)'
        return false
     }
}

// Funcion para registrar usuario

function isUserExist(input){
    if(!isNameValid(input)) return

    if (!localStorage.getItem("username")){
        localStorage.setItem("username", input)
        window.location.href = "setup.html"
    }else{
       window.location.href = "workout.html"
    }
}


// Pasamos a la pagina de workout si usuario existe

/* if (localStorage.getItem("username")) {
  window.location.href = "workout.html"
} */

const selectGoal = document.getElementById('goal')
const selectDays = document.getElementById('days')

const fullBodyGain = [
    {
      day: 1,
      exercises: [
        {
          name: 'Sentadilla con barra',
          sets: 4,
          rep: '6-8',
     
        },
         {
          name: 'Press de banca',
          sets: 4,
          rep: '6-8',
       
        },
         {
          name: 'Remo con barra',
          sets: 3,
          rep: '8-10',
      
        },
         {
          name: 'Press militar',
          sets: 3,
          rep: '8-10',
    
        },
         {
          name: 'Plancha abdominal',
          sets: 3,
          rep: '30-60 seg',
         
        }
        
      ]
    },
     {
      day: 2,
      exercises: [
        {
          name: 'Peso muerto',
          sets: 4,
          rep: '5-6',
   
        },
         {
          name: 'Dominadas',
          sets: 3,
          rep: '6-10',
     
        },
         {
          name: 'Zancadas con mancuernas',
          sets: 3,
          rep: '8-10',
 
        },
         {
          name: 'Fondos en paralelas',
          sets: 3,
          rep: '8-12',
    
        },
         {
          name: 'Curl de bíceps',
          sets: 3,
          rep: '10',
         
        }
        
      ]
    }
    
    
]

const fullBodyCut = [
    {
      day: 1,
      exercises: [
        {
          name: 'Sentadilla',
          sets: 3,
          rep: '12-15',
    
        },
         {
          name: 'Flexiones',
          sets: 3,
          rep: '12-15',
     
        },
         {
          name: 'Remo con mancuernas',
          sets: 3,
          rep: '12-15',
  
        },
         {
          name: 'Saltos',
          sets: 3,
          rep: '10-12',
    
        },
         {
          name: 'Plancha abdominal',
          sets: 3,
          rep: '30-45 seg',
     
        }
        
      ]
    },
     {
      day: 2,
      exercises: [
        {
          name: 'Peso muerto ligero',
          sets: 3,
          rep: '10-12',
      
        },
         {
          name: 'Zancadas',
          sets: 3,
          rep: '12 por pierna',
 
        },
         {
          name: 'Dominadas o jalón',
          sets: 3,
          rep: '10-12',
     
        },
         {
          name: 'Burpees',
          sets: 3,
          rep: '10-15',
         
        },
         {
          name: 'Abdominales',
          sets: 3,
          rep: '15-20',
          
        }
        
      ]
    }
    
    
]

const pplGain = [
  {
    day: 1,
    exercises: [
      {
        name: 'Press de banca',
        sets: 4,
        rep: '6-8'
      },
      {
        name: 'Press militar',
        sets: 4,
        rep: '8-10'
      },
      {
        name: 'Fondos en paralelas',
        sets: 3,
        rep: '8-12'
      },
      {
        name: 'Elevaciones laterales',
        sets: 3,
        rep: '12'
      },
      {
        name: 'Extensión de tríceps',
        sets: 3,
        rep: '10-12'
      }
    ]
  },
  {
    day: 2,
    exercises: [
      {
        name: 'Dominadas',
        sets: 4,
        rep: '6-10'
      },
      {
        name: 'Remo con barra',
        sets: 4,
        rep: '8-10'
      },
      {
        name: 'Jalón al pecho',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Curl de bíceps',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Curl martillo',
        sets: 3,
        rep: '10'
      }
    ]
  },
  {
    day: 3,
    exercises: [
      {
        name: 'Sentadilla con barra',
        sets: 4,
        rep: '6-8'
      },
      {
        name: 'Prensa de pierna',
        sets: 4,
        rep: '10'
      },
      {
        name: 'Peso muerto rumano',
        sets: 3,
        rep: '8-10'
      },
      {
        name: 'Zancadas',
        sets: 3,
        rep: '10 por pierna'
      },
      {
        name: 'Elevación de gemelos',
        sets: 3,
        rep: '12-15'
      }
    ]
  }
]

const pplCut = [
  {
    day: 1,
    exercises: [
      {
        name: 'Flexiones (push-ups)',
        sets: 4,
        rep: '12-15'
      },
      {
        name: 'Press de banca ligero',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Press militar ligero',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Burpees',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Plancha abdominal',
        sets: 3,
        rep: '30-45 seg'
      }
    ]
  },
  {
    day: 2,
    exercises: [
      {
        name: 'Jalón al pecho',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Remo con mancuernas',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Curl de bíceps',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Jumping jacks',
        sets: 3,
        rep: '30 seg'
      },
      {
        name: 'Burpees',
        sets: 3,
        rep: '10'
      }
    ]
  },
  {
    day: 3,
    exercises: [
      {
        name: 'Sentadillas',
        sets: 4,
        rep: '15'
      },
      {
        name: 'Zancadas',
        sets: 3,
        rep: '12 por pierna'
      },
      {
        name: 'Jump squats',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Step-ups',
        sets: 3,
        rep: '12'
      },
      {
        name: 'Correr o cinta',
        sets: 1,
        rep: '10-15 min'
      }
    ]
  }
]

const upperLowerGain = [
  {
    day: 1,
    exercises: [
      {
        name: 'Press de banca',
        sets: 4,
        rep: '6-8'
      },
      {
        name: 'Remo con barra',
        sets: 4,
        rep: '8-10'
      },
      {
        name: 'Press militar',
        sets: 3,
        rep: '8-10'
      },
      {
        name: 'Dominadas',
        sets: 3,
        rep: '6-10'
      },
      {
        name: 'Curl de bíceps',
        sets: 3,
        rep: '10-12'
      }
    ]
  },
  {
    day: 2,
    exercises: [
      {
        name: 'Sentadilla con barra',
        sets: 4,
        rep: '6-8'
      },
      {
        name: 'Prensa de pierna',
        sets: 4,
        rep: '10'
      },
      {
        name: 'Peso muerto rumano',
        sets: 3,
        rep: '8-10'
      },
      {
        name: 'Zancadas',
        sets: 3,
        rep: '10 por pierna'
      },
      {
        name: 'Elevación de gemelos',
        sets: 3,
        rep: '12-15'
      }
    ]
  },
  {
    day: 3,
    exercises: [
      {
        name: 'Press inclinado con mancuernas',
        sets: 4,
        rep: '8-10'
      },
      {
        name: 'Jalón al pecho',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Elevaciones laterales',
        sets: 3,
        rep: '12'
      },
      {
        name: 'Fondos en paralelas',
        sets: 3,
        rep: '8-12'
      },
      {
        name: 'Curl martillo',
        sets: 3,
        rep: '10'
      }
    ]
  },
  {
    day: 4,
    exercises: [
      {
        name: 'Sentadilla frontal',
        sets: 4,
        rep: '6-8'
      },
      {
        name: 'Peso muerto',
        sets: 4,
        rep: '5-6'
      },
      {
        name: 'Extensión de piernas',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Curl femoral',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Abdominales',
        sets: 3,
        rep: '15-20'
      }
    ]
  }
]

const upperLowerCut = [
  {
    day: 1,
    exercises: [
      {
        name: 'Flexiones (push-ups)',
        sets: 4,
        rep: '12-15'
      },
      {
        name: 'Press de banca ligero',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Remo con mancuernas',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Burpees',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Plancha abdominal',
        sets: 3,
        rep: '30-45 seg'
      }
    ]
  },
  {
    day: 2,
    exercises: [
      {
        name: 'Sentadillas',
        sets: 4,
        rep: '15'
      },
      {
        name: 'Zancadas',
        sets: 3,
        rep: '12 por pierna'
      },
      {
        name: 'Jump squats',
        sets: 3,
        rep: '10-12'
      },
      {
        name: 'Step-ups',
        sets: 3,
        rep: '12'
      },
      {
        name: 'Correr o cinta',
        sets: 1,
        rep: '10-15 min'
      }
    ]
  },
  {
    day: 3,
    exercises: [
      {
        name: 'Jalón al pecho',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Curl de bíceps',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Remo con barra ligero',
        sets: 3,
        rep: '12-15'
      },
      {
        name: 'Jumping jacks',
        sets: 3,
        rep: '30 seg'
      },
      {
        name: 'Burpees',
        sets: 3,
        rep: '10'
      }
    ]
  },
  {
    day: 4,
    exercises: [
      {
        name: 'Sentadilla con peso corporal',
        sets: 4,
        rep: '15-20'
      },
      {
        name: 'Zancadas caminando',
        sets: 3,
        rep: '12 por pierna'
      },
      {
        name: 'Mountain climbers',
        sets: 3,
        rep: '30 seg'
      },
      {
        name: 'Abdominales',
        sets: 3,
        rep: '20'
      },
      {
        name: 'Cardio (cinta o bici)',
        sets: 1,
        rep: '15 min'
      }
    ]
  }
]