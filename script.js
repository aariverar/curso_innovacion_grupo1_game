// Elementos del DOM
const loginScreen = document.getElementById('loginScreen');
const learningScreen = document.getElementById('learningScreen');
const resultsScreen = document.getElementById('resultsScreen');
const phoneNumberInput = document.getElementById('phoneNumber');
const startLearningBtn = document.getElementById('startLearning');
const phoneError = document.getElementById('phoneError');
const backBtn = document.getElementById('backBtn');
const progressFill = document.getElementById('progressFill');
const questionCounter = document.getElementById('questionCounter');
const questionTitle = document.getElementById('questionTitle');
const questionContent = document.getElementById('questionContent');
const answersContainer = document.getElementById('answersContainer');
const continueBtn = document.getElementById('continueBtn');
const feedbackOverlay = document.getElementById('feedbackOverlay');
const feedbackIcon = document.getElementById('feedbackIcon');
const feedbackTitle = document.getElementById('feedbackTitle');
const feedbackMessage = document.getElementById('feedbackMessage');
const lifeHearts = document.querySelectorAll('.life-heart');

// Variables de estado
let currentUser = null;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let lives = 3;
let selectedAnswer = null;
let isAnswerChecked = false;

// Base de datos de preguntas sobre WhatsApp para adultos
const questions = [
    {
        id: 1,
        title: "Identifica el logo de WhatsApp",
        description: "¿Cuál de estos logos corresponde a WhatsApp?",
        type: "visual-choice",
        answers: [
            { 
                text: '<div class="logo-option"><i class="fab fa-facebook" style="color: #1877F2; font-size: 3rem;"></i></div>', 
                correct: false 
            },
            { 
                text: '<div class="logo-option"><i class="fab fa-whatsapp" style="color: #25D366; font-size: 3rem;"></i></div>', 
                correct: true 
            },
            { 
                text: '<div class="logo-option"><i class="fab fa-instagram" style="color: #E4405F; font-size: 3rem;"></i></div>', 
                correct: false 
            },
            { 
                text: '<div class="logo-option"><i class="fab fa-youtube" style="color: #FF0000; font-size: 3rem;"></i></div>', 
                correct: false 
            }
        ],
        explanation: "WhatsApp tiene un logo verde con un teléfono blanco dentro de una burbuja de chat."
    },
    {
        id: 2,
        title: "¿Dónde encuentras las llamadas en WhatsApp?",
        description: "Identifica la pestaña correcta para acceder a las llamadas:",
        type: "visual-choice",
        answers: [
            { 
                text: '<div class="whatsapp-tab"><i class="fas fa-star" style="color: #25D366; font-size: 2rem;"></i><span>Novedades</span></div>', 
                correct: false 
            },
            { 
                text: '<div class="whatsapp-tab"><i class="fas fa-phone" style="color: #25D366; font-size: 2rem;"></i><span>Llamadas</span></div>', 
                correct: true 
            },
            { 
                text: '<div class="whatsapp-tab"><i class="fas fa-users" style="color: #25D366; font-size: 2rem;"></i><span>Comunidades</span></div>', 
                correct: false 
            },
            { 
                text: '<div class="whatsapp-tab"><i class="fas fa-comment" style="color: #25D366; font-size: 2rem;"></i><span>Chats</span></div>', 
                correct: false 
            }
        ],
        explanation: "La pestaña 'Llamadas' es donde encuentras todas tus llamadas de voz y video."
    },
    {
        id: 3,
        title: "¿Con cuál ícono compartes una foto?",
        description: "Selecciona el ícono correcto para tomar o enviar fotos:",
        type: "visual-choice",
        answers: [
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-camera" style="color: #25D366; font-size: 2.2rem;"></i><span>Cámara</span></div>', 
                correct: true 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-microphone" style="color: #25D366; font-size: 2.2rem;"></i><span>Micrófono</span></div>', 
                correct: false 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-video" style="color: #25D366; font-size: 2.2rem;"></i><span>Videollamada</span></div>', 
                correct: false 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-smile" style="color: #25D366; font-size: 2.2rem;"></i><span>Stickers</span></div>', 
                correct: false 
            }
        ],
        explanation: "El ícono de la cámara te permite tomar fotos nuevas o seleccionar desde tu galería."
    },
    {
        id: 4,
        title: "¿Con cuál ícono realizas una videollamada?",
        description: "Selecciona el ícono correcto para hacer videollamadas:",
        type: "visual-choice",
        answers: [
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-camera" style="color: #25D366; font-size: 2.2rem;"></i><span>Cámara</span></div>', 
                correct: false 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-microphone" style="color: #25D366; font-size: 2.2rem;"></i><span>Micrófono</span></div>', 
                correct: false 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-video" style="color: #25D366; font-size: 2.2rem;"></i><span>Videollamada</span></div>', 
                correct: true 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-smile" style="color: #25D366; font-size: 2.2rem;"></i><span>Stickers</span></div>', 
                correct: false 
            }
        ],
        explanation: "El ícono de video te permite realizar videollamadas para ver a la persona mientras hablas."
    },
    {
        id: 5,
        title: "¿Con cuál ícono envías un mensaje de voz?",
        description: "Selecciona el ícono correcto para grabar y enviar audio:",
        type: "visual-choice",
        answers: [
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-camera" style="color: #25D366; font-size: 2.2rem;"></i><span>Cámara</span></div>', 
                correct: false 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-microphone" style="color: #25D366; font-size: 2.2rem;"></i><span>Micrófono</span></div>', 
                correct: true 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-video" style="color: #25D366; font-size: 2.2rem;"></i><span>Videollamada</span></div>', 
                correct: false 
            },
            { 
                text: '<div class="whatsapp-action"><i class="fas fa-smile" style="color: #25D366; font-size: 2.2rem;"></i><span>Stickers</span></div>', 
                correct: false 
            }
        ],
        explanation: "El ícono del micrófono te permite grabar y enviar mensajes de voz a tus contactos."
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Verificar si hay usuario guardado
    const savedUser = localStorage.getItem('whatsappLearningUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    // Event listeners
    phoneNumberInput.addEventListener('input', validatePhoneNumber);
    phoneNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && startLearningBtn.disabled === false) {
            startLearning();
        }
    });
    
    startLearningBtn.addEventListener('click', startLearning);
    backBtn.addEventListener('click', goBackToLogin);
    continueBtn.addEventListener('click', handleContinue);
    
    // Formatear número mientras se escribe
    phoneNumberInput.addEventListener('input', formatPhoneNumber);
    
    console.log('🚀 WhatsApp Learning App iniciada');
}

function formatPhoneNumber() {
    let value = phoneNumberInput.value.replace(/\D/g, ''); // Solo números
    
    // Limitar a 9 dígitos
    if (value.length > 9) {
        value = value.substring(0, 9);
    }
    
    // Formatear: 987 654 321
    let formattedValue = '';
    if (value.length >= 1) {
        formattedValue = value.substring(0, 3);
        if (value.length >= 4) {
            formattedValue += ' ' + value.substring(3, 6);
            if (value.length >= 7) {
                formattedValue += ' ' + value.substring(6, 9);
            }
        }
    }
    
    phoneNumberInput.value = formattedValue;
}

function validatePhoneNumber() {
    const phoneNumber = phoneNumberInput.value.replace(/\s/g, ''); // Quitar espacios
    const phoneRegex = /^9\d{8}$/; // Número peruano: 9XXXXXXXX
    
    const errorElement = document.getElementById('phoneError');
    
    if (phoneNumber.length === 0) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        startLearningBtn.disabled = true;
        return false;
    }
    
    if (!phoneRegex.test(phoneNumber)) {
        if (phoneNumber.length < 9) {
            errorElement.textContent = 'El número debe tener 9 dígitos';
        } else if (!phoneNumber.startsWith('9')) {
            errorElement.textContent = 'El número debe comenzar con 9';
        } else {
            errorElement.textContent = 'Formato de número inválido';
        }
        errorElement.classList.add('show');
        startLearningBtn.disabled = true;
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        startLearningBtn.disabled = false;
        return true;
    }
}

function startLearning() {
    if (!validatePhoneNumber()) return;
    
    const phoneNumber = phoneNumberInput.value.replace(/\s/g, '');
    currentUser = {
        phone: phoneNumber,
        startTime: new Date().toISOString(),
        progress: 0
    };
    
    // Guardar usuario
    localStorage.setItem('whatsappLearningUser', JSON.stringify(currentUser));
    
    // Inicializar estado del juego
    currentQuestionIndex = 0;
    correctAnswers = 0;
    lives = 3;
    
    // Cambiar a pantalla de aprendizaje
    showScreen('learning');
    loadQuestion();
    
    // Anunciar para lectores de pantalla
    if (window.announce) {
        window.announce('Comenzando el curso de WhatsApp');
    }
}

function showScreen(screenName) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar pantalla seleccionada
    switch(screenName) {
        case 'login':
            loginScreen.classList.add('active');
            break;
        case 'learning':
            learningScreen.classList.add('active');
            break;
        case 'results':
            resultsScreen.classList.add('active');
            break;
    }
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    
    // Actualizar UI
    updateProgressBar();
    updateQuestionCounter();
    updateHearts();
    
    // Cargar contenido de la pregunta
    questionTitle.textContent = question.title;
    questionContent.textContent = question.description;
    
    // Limpiar respuestas anteriores
    answersContainer.innerHTML = '';
    selectedAnswer = null;
    isAnswerChecked = false;
    continueBtn.disabled = true;
    
    // Crear botones de respuestas
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-btn';
        
        // Verificar si es pregunta visual o texto normal
        if (question.type === 'visual-choice') {
            answerBtn.innerHTML = answer.text; // Usar innerHTML para logos
        } else {
            answerBtn.textContent = answer.text; // Usar textContent para texto normal
        }
        
        answerBtn.setAttribute('data-index', index);
        answerBtn.setAttribute('data-correct', answer.correct);
        
        answerBtn.addEventListener('click', () => selectAnswer(answerBtn, index));
        
        answersContainer.appendChild(answerBtn);
    });
    
    // Animación de entrada
    setTimeout(() => {
        document.querySelector('.question-card').style.animation = 'cardEntrance 0.6s ease-out';
        document.querySelectorAll('.answer-btn').forEach((btn, index) => {
            btn.style.animation = `buttonEntrance 0.4s ease-out ${index * 0.1}s both`;
        });
    }, 100);
}

function selectAnswer(button, index) {
    if (isAnswerChecked) return;
    
    // Quitar selección anterior
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Seleccionar nueva respuesta
    button.classList.add('selected');
    selectedAnswer = index;
    continueBtn.disabled = false;
    
    // Efecto de vibración en móviles
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function handleContinue() {
    if (selectedAnswer === null) return;
    
    if (!isAnswerChecked) {
        // Verificar respuesta
        checkAnswer();
    } else {
        // Continuar a siguiente pregunta
        currentQuestionIndex++;
        loadQuestion();
    }
}

function checkAnswer() {
    const question = questions[currentQuestionIndex];
    const selectedBtn = document.querySelector('.answer-btn.selected');
    const isCorrect = selectedBtn.getAttribute('data-correct') === 'true';
    
    isAnswerChecked = true;
    
    // Deshabilitar todos los botones
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.add('disabled');
    });
    
    // Mostrar respuestas correctas/incorrectas
    document.querySelectorAll('.answer-btn').forEach(btn => {
        const btnIsCorrect = btn.getAttribute('data-correct') === 'true';
        if (btnIsCorrect) {
            btn.classList.add('correct');
        } else if (btn.classList.contains('selected')) {
            btn.classList.add('incorrect');
        }
    });
    
    if (isCorrect) {
        correctAnswers++;
        showFeedback(true, '¡Correcto!', question.explanation);
    } else {
        lives--;
        updateHearts();
        showFeedback(false, 'Incorrecto', question.explanation);
        
        if (lives === 0) {
            setTimeout(() => {
                showResults();
            }, 2000);
            return;
        }
    }
    
    // Cambiar texto del botón continuar
    if (currentQuestionIndex === questions.length - 1) {
        continueBtn.innerHTML = '<span>Ver Resultados</span><i class="fas fa-trophy"></i>';
    } else {
        continueBtn.innerHTML = '<span>Siguiente</span><i class="fas fa-arrow-right"></i>';
    }
    
    continueBtn.disabled = false;
}

function showFeedback(isCorrect, title, message) {
    feedbackIcon.className = `feedback-icon ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackIcon.innerHTML = `<i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>`;
    feedbackTitle.textContent = title;
    feedbackMessage.textContent = message;
    
    feedbackOverlay.classList.add('show');
    
    // Ocultar después de 2 segundos
    setTimeout(() => {
        feedbackOverlay.classList.remove('show');
    }, 2000);
    
    // Vibración diferente según resultado
    if (navigator.vibrate) {
        if (isCorrect) {
            navigator.vibrate([50, 50, 50]);
        } else {
            navigator.vibrate([100, 50, 100]);
        }
    }
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function updateQuestionCounter() {
    questionCounter.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
}

function updateHearts() {
    lifeHearts.forEach((heart, index) => {
        if (index < lives) {
            heart.classList.add('active');
            heart.classList.remove('lost');
        } else {
            heart.classList.remove('active');
            heart.classList.add('lost');
        }
    });
}

function goBackToLogin() {
    if (confirm('¿Estás seguro de que quieres salir? Perderás tu progreso actual.')) {
        showScreen('login');
        
        // Limpiar formulario
        phoneNumberInput.value = '';
        startLearningBtn.disabled = true;
        document.getElementById('phoneError').classList.remove('show');
    }
}

function showResults() {
    const accuracy = Math.round((correctAnswers / questions.length) * 100);
    const passed = accuracy >= 60;
    
    // Actualizar estadísticas
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    // Actualizar título y subtítulo basado en rendimiento
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsSubtitle = document.getElementById('resultsSubtitle');
    const resultsIcon = document.getElementById('resultsIcon');
    
    if (passed) {
        resultsTitle.textContent = '¡Felicitaciones!';
        resultsSubtitle.textContent = 'Has aprobado el curso básico de WhatsApp';
        resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        resultsIcon.style.background = 'var(--duolingo-yellow)';
    } else {
        resultsTitle.textContent = '¡Sigue practicando!';
        resultsSubtitle.textContent = 'Necesitas más práctica para dominar WhatsApp';
        resultsIcon.innerHTML = '<i class="fas fa-medal"></i>';
        resultsIcon.style.background = 'var(--duolingo-blue)';
    }
    
    // Generar logros
    generateAchievements(accuracy, correctAnswers, lives);
    
    // Configurar botones de acción
    setupResultsButtons();
    
    // Mostrar pantalla de resultados
    showScreen('results');
    
    // Guardar progreso
    if (currentUser) {
        currentUser.completed = true;
        currentUser.score = accuracy;
        currentUser.completedAt = new Date().toISOString();
        localStorage.setItem('whatsappLearningUser', JSON.stringify(currentUser));
    }
}

function generateAchievements(accuracy, correct, livesLeft) {
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '';
    
    const achievements = [];
    
    if (accuracy === 100) {
        achievements.push('🏆 Perfección Total - Respondiste todas correctamente');
    } else if (accuracy >= 80) {
        achievements.push('🌟 Excelente - Más del 80% correcto');
    } else if (accuracy >= 60) {
        achievements.push('✅ Aprobado - Has pasado el curso básico');
    }
    
    if (livesLeft === 3) {
        achievements.push('❤️ Sin Errores - Mantuviste todas tus vidas');
    }
    
    if (correct >= 3) {
        achievements.push('📱 Conocedor de WhatsApp - Dominas lo básico');
    }
    
    achievements.push('🎓 Primer Curso - Completaste tu primera lección');
    
    achievements.forEach(achievement => {
        const achievementItem = document.createElement('div');
        achievementItem.className = 'achievement-item';
        achievementItem.textContent = achievement;
        achievementsList.appendChild(achievementItem);
    });
}

function setupResultsButtons() {
    const restartBtn = document.getElementById('restartBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    restartBtn.addEventListener('click', () => {
        // Reiniciar el juego
        currentQuestionIndex = 0;
        correctAnswers = 0;
        lives = 3;
        showScreen('learning');
        loadQuestion();
    });
    
    shareBtn.addEventListener('click', () => {
        const accuracy = Math.round((correctAnswers / questions.length) * 100);
        const shareText = `¡Completé el curso básico de WhatsApp! 📱\n\n` +
                         `✅ Respuestas correctas: ${correctAnswers}/${questions.length}\n` +
                         `📊 Precisión: ${accuracy}%\n\n` +
                         `¡Ahora sé usar WhatsApp mejor! 🎉`;
        
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// Animaciones CSS adicionales
const additionalStyles = `
@keyframes buttonEntrance {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Prevenir zoom en inputs (iOS Safari)
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'INPUT') {
        e.target.style.fontSize = '16px';
    }
});

// Soporte para teclado
document.addEventListener('keydown', function(e) {
    // ESC para cerrar feedback
    if (e.key === 'Escape' && feedbackOverlay.classList.contains('show')) {
        feedbackOverlay.classList.remove('show');
    }
    
    // Enter para continuar
    if (e.key === 'Enter' && !continueBtn.disabled && learningScreen.classList.contains('active')) {
        handleContinue();
    }
    
    // Números 1-4 para seleccionar respuestas
    if (e.key >= '1' && e.key <= '4' && learningScreen.classList.contains('active') && !isAnswerChecked) {
        const answerIndex = parseInt(e.key) - 1;
        const answerBtn = document.querySelector(`.answer-btn[data-index="${answerIndex}"]`);
        if (answerBtn) {
            selectAnswer(answerBtn, answerIndex);
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`📊 Tiempo de carga: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}

console.log('🎓 WhatsApp Learning - Sistema educativo cargado correctamente');