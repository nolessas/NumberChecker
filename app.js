const { createApp, ref, computed, watch, onMounted } = Vue;

createApp({
    setup() {
        const title = ref('Mega Ultra Fancy Number Checker');
        const inputNumber = ref('');
        const showResult = ref(false);
        const resultMessage = ref('');
        const resultClass = ref('');
        const funFact = ref('');

        const isValidNumber = computed(() => {
            const num = Number(inputNumber.value);
            return !isNaN(num) && num >= 0 && num <= 99;
        });

        const displayNumber = computed(() => {
            return inputNumber.value.padStart(2, '0').split('');
        });

        async function checkNumber() {
            const num = Number(inputNumber.value);
            
            if (isNaN(num)) {
                resultMessage.value = 'Please enter a valid number.';
                resultClass.value = 'error';
            } else if (num >= 0 && num <= 99) {
                resultMessage.value = `The number ${num} is between 0 and 99.`;
                resultClass.value = 'success';
                await getFunFact(num);
            } else {
                resultMessage.value = `The number ${num} is not between 0 and 99.`;
                resultClass.value = 'error';
            }

            showResult.value = true;
            animateResult();
        }

        function animateResult() {
            gsap.from('.result', {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        }

        async function getFunFact(num) {
            try {
                const response = await fetch(`http://numbersapi.com/${num}`);
                funFact.value = await response.text();
            } catch (error) {
                console.error('Error fetching fun fact:', error);
                funFact.value = 'Did you know that every number has its own unique story?';
            }
        }

        watch(inputNumber, (newValue) => {
            if (newValue) {
                gsap.to('.digit', {
                    y: -10,
                    rotationX: 360,
                    stagger: 0.1,
                    duration: 0.3,
                    ease: 'back.out(2)',
                    yoyo: true,
                    repeat: 1
                });
            }
        });

        onMounted(() => {
            if (typeof VANTA !== 'undefined' && VANTA.NET) {
                VANTA.NET({
                    el: "#vanta-background",
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x3fffe8,
                    backgroundColor: 0x23153c,
                    points: 20.00,
                    maxDistance: 30.00,
                    spacing: 17.00
                });
            } else {
                console.error('VANTA is not defined. The background animation may not work.');
            }
        });

        return {
            title,
            inputNumber,
            showResult,
            resultMessage,
            resultClass,
            isValidNumber,
            checkNumber,
            displayNumber,
            funFact
        };
    }
}).mount('#app');
