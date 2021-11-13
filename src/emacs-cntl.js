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
        }
};

browser.commands.onCommand.addListener(
        function command_parser(command) {
                const prefix = command.split("-")[0];
                const body = command.split("-")[1];
                if (prefix == "alt") {
                        alt_command(body)
                }
        }
);