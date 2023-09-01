const loadAI = async (isSeeAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    const data = await res.json()
    const universes = data.data.tools
    // console.log(universes)
    //return universes
    displayUniverse(universes,isSeeAll)
   // handleSort(universes)
}
const displayUniverse = (universes,isSeeAll) => {
    //console.log(universes)
    const universeContainer = document.getElementById('universe-container')
    universeContainer.textContent=''
    const seeAll=document.getElementById('see-all')
    if(universes.length>2&&!isSeeAll){
seeAll.classList.remove('hidden')
    }
    else{
        seeAll.classList.add('hidden')

    }
   // console.log(isSeeAll)
    if(!isSeeAll){

        universes=universes.slice(0,6)
    }
    universes.forEach(universe => {
        //console.log(universe)
        const features = universe.features;
        // console.log(features)
        const universeCard = document.createElement('div')
        universeCard.classList = `card p-4 bg-gray-100 shadow-xl `;
        universeCard.innerHTML = `
        <figure><img src="${universe.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title text-black">Features</h2>
            <ol class='list-decimal mb-4'> ${features.map(feature =>
                `<li>${feature}
                </li>`
                ).join(" ")} </ol>
            <hr>
            <div>
                <h2 class="card-title text-black">${universe.name}</h2>
                <div class="flex flex-row items-center justify-between gap-3">
                    <div class="flex flex-row gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z"
                                stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>${universe.published_in}</p>
                    </div>
                    <div class=" p-3"><button class="btn rounded-full" onclick="show_details_modal.showModal();seeModal('${universe.id}')"><svg
                        xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                        <path d="M1.5 8H16.5M16.5 8L9.75 1.25M16.5 8L9.75 14.75" stroke="#EB5757" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg></button>
                    </div>
                </div>
            </div>
        </div>`
        universeContainer.append(universeCard)
    })
}
const seeModal=async (id)=>
{
   // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json()
    const singleUniverse = data.data
    showUniverseDetails(singleUniverse)

}
const showUniverseDetails= (singleUniverse)=>{
   // console.log(singleUniverse)
//    const universeName=document.getElementById('universe-name')
//    universeName.innerText=singleUniverse.tool_name
const integrations = singleUniverse.integrations;
const features = singleUniverse.features;
const featU =Object.values(features)
//console.log(features)
const spFeature=[...featU]
//console.log(spFeature)
// for (const featureSep of spFeature) {
//    console.log(featureSep.feature_name)
// }


const detailContainer=document.getElementById('show-detail-container')
detailContainer.innerHTML=`<div class="flex flex-row gap-4 background-[#EB57570D] p-2 ">
<div class="border-2 p-4 border-[#EB5757] rounded-lg flex-1  w-[40%] ">
    <h4 class="text-2xl font-bold text-justify mb-6 ">${singleUniverse.description}</h4>
    <div class="flex flex-row gap-7 text-base font-bold justify-between items-center mb-4 ">
        <p class="bg-white p-3 text-center text-[#03A30A]">${singleUniverse.pricing[0].price} ${singleUniverse.pricing[0].plan}
            </p>
        <p class="bg-white p-3 text-center text-[#F28927]">${singleUniverse.pricing[1].price} ${singleUniverse.pricing[1].plan}</p>
        <p class="bg-white p-3 text-center text-[#EB5757]">${singleUniverse.pricing[2].price} ${singleUniverse.pricing[2].plan}</p>
    </div>
    <div class="flex flex-row gap-4 justify-between items-center">
        <div class="p-4">
            <h4  class="text-xl font-bold">Features</h4>
            <ul class="list-disc p-4">
            ${spFeature.map(featureSep =>
                `<li>${featureSep.feature_name}
                </li>`
                ).join(" ")}
           </ul>
        </div>
        <div>
            <h4  class="text-xl font-bold">Integrations</h4>
            <ul class="list-disc p-4">
            ${integrations.map(integration =>
                `<li>${integration}
                </li>`
                ).join(" ")}
            </ul>
        </div>



    </div>
</div>
<div class="flex-1 flex flex-col justify-center items-center w-[60%] border-2 p-2 border-[#E7E7E7] rounded-lg  ">
    <div class="relative"><img src="${singleUniverse.image_link[0]}" class="" alt="">
    <p class=" px-4  bg-red-400 text-white absolute top-0 right-0">${singleUniverse.accuracy?.score? (singleUniverse.accuracy.score*100+"% accuracy") : 'No Accuracy Found'}</p>
<div>
    <h4  class="text-xl font-bold text-center">"${singleUniverse.input_output_examples[0].input}"</h4>
    <p class=" px-10 text-center">${singleUniverse.input_output_examples[0].input}</p>
</div>
</div>`
console.log(
    )
    show_details_modal.showModal()
}



const dateSort = (a, b) => {
    const dateA = new Date(a.published_in)
    const dateB = new Date(b.published_in)
    if (dateA > dateB) return 1;
    else if (dateA < dateB) return -1;
    return 0;
}


const sortBtn=document.getElementById('sort-btn').addEventListener('click', async function () {
//console.log("hello")
const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
const data = await res.json()
const universes = data.data.tools
console.log(universes)
     // console.log(sortedUniverses)

     displayUniverse(universes.sort(dateSort),false)

})

document.getElementById('see-all').addEventListener('click',  function () {
    loadAI(true)
    //sortBtn(true)

    })
loadAI()

