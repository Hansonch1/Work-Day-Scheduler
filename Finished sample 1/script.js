$(document).ready(function () {
   
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));

    
    function generateTimeBlocks() {
        var container = $(".container-fluid");

       
        for (var hour = 9; hour <= 17; hour++) {
            var ampm = hour < 12 ? 'AM' : 'PM';
            var displayHour = hour <= 12 ? hour : hour - 12;

            var timeBlock = $(`
                <div id="hour-${hour}" class="row time-block">
                    <div class="col-2 col-md-1 hour text-center py-3">${displayHour} ${ampm}</div>
                    <textarea class="col-8 col-md-10 description" rows="3"></textarea>
                    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                        <i class="fas fa-save" aria-hidden="true"></i>
                    </button>
                </div>
            `);

            container.append(timeBlock);
        }
    }

   
    generateTimeBlocks();

    
    function updateTimeBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("-")[1]);

            
            $(this).removeClass("past present future");

            if (blockHour < currentHour) {
                $(this).addClass("past");
            } else if (blockHour === currentHour) {
                $(this).addClass("present");
            } else {
                $(this).addClass("future");
            }
        });
    }

    
    updateTimeBlocks();

   
    $(".saveBtn").on("click", function () {
        var hour = $(this).parent().attr("id").split("-")[1];
        var description = $(this).siblings(".description").val();
        localStorage.setItem(`event_${hour}`, description);
    });

   
    function loadEvents() {
        for (var i = 9; i <= 17; i++) {
            var eventText = localStorage.getItem(`event_${i}`);
            if (eventText !== null) {
                $(`#hour-${i} .description`).val(eventText);
            }
        }
    }

    
    loadEvents();

    
    function updateColorsEveryMinute() {
        updateTimeBlocks();
        setTimeout(updateColorsEveryMinute, 60000); // 60000 milliseconds = 1 minute
    }

    
    updateColorsEveryMinute();
});
