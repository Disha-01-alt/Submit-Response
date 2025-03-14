document.addEventListener("DOMContentLoaded", function () {
    const districtSelect = document.getElementById("district");
    const schoolSelect = document.getElementById("school");
    const classSelect = document.getElementById("class");
    const streamSelect = document.getElementById("stream");
    const industrySelect = document.getElementById("industry");
    const careerSelect = document.getElementById("career");

    const coursesContainer = document.getElementById("courses_container");
    const timeSelect = document.getElementById("study_time");

    const supportContainer = document.getElementById("support_container");

    // Load JSON Data
    fetch("career_data.json")
        .then(response => response.json())
        .then(data => {
            populateDropdown(districtSelect, Object.keys(data.districts));
            populateDropdown(classSelect, data.classes);
            populateDropdown(streamSelect, data.streams);
            populateDropdown(industrySelect, Object.keys(data.industries));
            populateDropdown(timeSelect, data.study_time);


            // Convert multi-select fields into checkbox lists
            populateCheckboxes(coursesContainer, data.courses, "courses");
            populateCheckboxes(supportContainer, data.support_options, "support_needed");

            districtSelect.addEventListener("change", function () {
                populateDropdown(schoolSelect, data.districts[districtSelect.value] || []);
            });

            industrySelect.addEventListener("change", function () {
                careerSelect.innerHTML = "<option value=''>Select Career</option>";
                if (industrySelect.value && data.industries[industrySelect.value]) {
                    populateDropdown(careerSelect, data.industries[industrySelect.value]);
                }
            });
        })
        .catch(error => console.error("Error loading data:", error));

    function populateDropdown(selectElement, options) {
        if (!selectElement) return;
        selectElement.innerHTML = "<option value=''>Select</option>";
        options.forEach(option => {
            let opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }

    function populateCheckboxes(container, options, name) {
        if (!container) return;
        container.innerHTML = "";
        options.forEach(option => {
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.type = "checkbox";
            input.name = name;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            container.appendChild(label);
        });
    }
});
