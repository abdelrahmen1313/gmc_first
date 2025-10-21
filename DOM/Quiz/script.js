console.log("hello world!");




let submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", function () {
    let score = 0;

    // Q1: correct value B
    let Q1_List = document.getElementsByName("question1");
    for (let radio of Q1_List) {
        if (radio.checked && radio.value === "B") score++;
    }

    // Q2: correct value A
    let Q2_List = document.getElementsByName("question2");
    for (let radio of Q2_List) {
        if (radio.checked && radio.value === "A") score++;
    }

    // Q3: correct value B
    let Q3_List = document.getElementsByName("question3");
    for (let radio of Q3_List) {
        if (radio.checked && radio.value === "B") score++;
    }

    console.log("final score is", score);
    alert(`you scored ${score} of 3`);
});