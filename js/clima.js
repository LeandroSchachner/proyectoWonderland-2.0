window.addEventListener("load", ()=>{
    let lon 
    let lat 

    let temperaturaValor = document.getElementById("temperaturaValor")
    let temperaturaDescripcion = document.getElementById("temperaturaDescripcion")

    let ubicacion = document.getElementById("ubicacion")
    let iconoAnimado = document.getElementById("iconoAnimado")


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?&lang=es&units=metric&lat=${lat}&lon=${lon}&appid=5b25318bd61001aa7dc8d12cfd934a0a`
          console.log(url); 
          fetch(url)
           .then(response => { return response.json()})
           .then(data => {
               
               let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ° C`
               let desc = data.weather[0].description
              temperaturaDescripcion.textContent = desc.toUpperCase()
                 ubicacion.textContent = data.name 


                 console.log(data.weather[0].main)
                 switch (data.weather[0].main) {
                     case 'Thunderstorm':
                       iconoAnimado.src='animated/thunder.svg'
                       console.log('TORMENTA');
                       break;
                     case 'Drizzle':
                       iconoAnimado.src='animated/rainy-2.svg'
                       console.log('LLOVIZNA');
                       break;
                     case 'Rain':
                       iconoAnimado.src='animated/rainy-7.svg'
                       console.log('LLUVIA');
                       break;
                     case 'Snow':
                       iconoAnimado.src='animated/snowy-6.svg'
                         console.log('NIEVE');
                       break;                        
                     case 'Clear':
                         iconoAnimado.src='animated/day.svg'
                         console.log('LIMPIO');
                       break;
                     case 'Atmosphere':
                       iconoAnimado.src='animated/weather.svg'
                         console.log('ATMOSFERA');
                         break;  
                     case 'Clouds':
                         iconoAnimado.src='animated/cloudy-day-1.svg'
                         console.log('NUBES');
                         break;  
                     default:
                       iconoAnimado.src='animated/cloudy-day-1.svg'
                       console.log('por defecto');
                   }
 
            })

           }) 
           //.catch(error => {console.log(error);})
        }

    }) 