const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight -16
const color = [
    '#E37B40',
    '#46B29D',
    '#DE5B49',
    '#324D5C',
    '#F0CA4D'
]

const fireWorksArray = []
class ParticleArray{
    constructor(x,y){
        this.particleArray = []
        for (let i = 0; i < 2; i++) {
            this.particleArray.push(new Particle(x,y))
        }
    }
}
class FireWork{
    constructor(){
        this.x = Math.random()*1340 + 70
        this.y = Math.random()*700 + 680
        this.height =Math.random()*275 + 90
        this.size = Math.random()*1.5 + 0.5
        this.speed = Math.random()*2 + 1 
        this.color = color[Math.floor(Math.random()*(color.length))]
        this.particleArray = []
        this.burstFireWorkArray = []
    }
    update(){
        if(this.size > 0)
        {
            this.y -= this.speed
            for (let i = 0; i < 2; i++) {
                this.particleArray.push(new Particle(this.x,this.y))
            }
        }
        if(this.y < this.height)
        {
            this.size = 0
            for (let i = 0; i < 5; i++) {
                this.burstFireWorkArray.push(new BurstFireWork(this.x,this.y))
            }
            
        }
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        ctx.fill()
        
    }
    handleParticle(){
        for(let i = 0; i < this.particleArray.length;i++)
        {
            this.particleArray[i].update()
            this.particleArray[i].draw()
            if(this.particleArray[i].size < 0.2)
            {
                this.particleArray.splice(i,1)
            }
        }
    }
    
    animateParticle(){
        // ctx.clearRect(0 , 0, canvas.width,canvas.height)
        this.handleParticle()
        
        // console.log('animateparticle');
        requestAnimationFrame(this.animateParticle)
    }

    handleBurst(){
        for(let i = 0; i < this.burstFireWorkArray.length;i++)
        {
            this.burstFireWorkArray[i].update()
            this.burstFireWorkArray[i].draw()
            if(this.burstFireWorkArray[i].size < 0.2)
            {
                this.burstFireWorkArray.splice(i,1)
            }
           
               
            
        }
    }
    
    animateBurst(){
        // ctx.clearRect(0 , 0, canvas.width,canvas.height)
        this.handleBurst()
        // console.log('animateBurst');
        requestAnimationFrame(this.animateBurst)
    }
}
class Particle{
    constructor(x,y){
        this.x = x
        this.y = y
        this.speedX = Math.random()*3 -1.5
        this.speedY = Math.random()*3 -1.5
        this.size = Math.random()*3 + 1
        this.color = color[Math.floor(Math.random()*(color.length))]
    }
    update(){
            this.y -= this.speedY
            this.x -= this.speedX
            if(this.size > 0.4)this.size -= 0.35
       
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2) 
        ctx.fill()
    }
}

class BurstFireWork {
    constructor(x,y){
        this.x = x
        this.y = y
        this.speedX = Math.random()*3 -1.5
        this.speedY = Math.random()*3 -1.5
        this.size = Math.random()*5 + 3
        this.color = color[Math.floor(Math.random()*(color.length))]
    }
    update(){
            this.y += this.speedY
            this.x += this.speedX
           if( this.size > 0.2)  this.size -= 0.1
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2) 
        ctx.fill()
    }
}
function check(x) {
    return fireWorksArray.find((curr)=>{
        return Math.abs(curr.x - x) < 50
    })
}

function handleFireWork(){
    for (let i = 0; i < fireWorksArray.length; i++) {
        fireWorksArray[i].update()
        fireWorksArray[i].animateParticle()
        if(fireWorksArray[i].size == 0 )
        {
            fireWorksArray[i].animateBurst()
            fireWorksArray.splice(i,1)
            
        }
        fireWorksArray[i].draw()
    }
}

canvas.addEventListener('click',()=>{
    while(fireWorksArray.length < 20){
        const fireWork = new FireWork()
        if(!check(fireWork.x))
        {
            for (let i = 0; i < 2; i++) {
                fireWork.particleArray.push(new Particle(fireWork.x,fireWork.y))
            }
            fireWorksArray.push(fireWork)
        }
    }
})

function animate(){
    

    ctx.clearRect(0 , 0, canvas.width,canvas.height)
    handleFireWork()
    requestAnimationFrame(animate)
}
animate()