$(function(){
    $('#game_reports').reportWidget({
        title: 'Game Reports',
        rName: {
            'r1': 'Accuracy Report',
            'r2': 'Time Taken Report',
            'r3': 'Win/Lost Report'
        },
        rData: {
            'r1': {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Template Run",
                        data: [30, 60, 10, 40, 33, 22, 50]
                    },
                    {
                        label: "Candy Crush",
                        data: [28, 48, 40, 19, 26, 40, 30]
                    },
                    {
                        label: "2048",
                        data: [50, 10, 30, 40, 20, 13, 33]
                    }
                ]
            },
            'r2': {
                labels: ["Jan", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Candy Crush",
                        data: [30, 60, 10, 40, 33, 22, 50]
                    },
                    {
                        label: "2048",
                        data: [28, 48, 40, 19, 26, 40, 30]
                    }
                ]
            },
            'r3': {
                labels: ["January", "Feb", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Win",
                        data: [30, 60, 10, 40, 33, 22, 50]
                    },
                    {
                        label: "Lost",
                        data: [28, 48, 40, 19, 26, 40, 30]
                    }
                ]
            }
        }
    });
});