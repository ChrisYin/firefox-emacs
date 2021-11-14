async function tab_switch(tab_idx) {
        const tabs = await browser.tabs.query({ currentWindow: true, hidden: false });
        const tab = tabs.slice(tab_idx);
        if (tab.length) {
                browser.tabs.update(tab[0].id, { active: true });
        }
};

function alt_command(body) {
        // number
        if (/[0-9]/.test(body)) {
                body = body % 9 - 1;
                tab_switch(body);
        } else if (body == "n") {
                browser.tabs.executeScript({
                        code: "window.scrollBy(0, window.innerHeight/2)"
                });
        } else if (body == "p") {
                browser.tabs.executeScript({
                        code: "window.scrollBy(0, -window.innerHeight/2)"
                });
        }
};

browser.commands.onCommand.addListener(
        function command_parser(command) {
                const prefix = command.split("-")[0];
                const body = command.split("-")[1];
                //console.log(prefix);
                //console.log(body);
                if (prefix == "alt") {
                        alt_command(body);
                }
        }
);