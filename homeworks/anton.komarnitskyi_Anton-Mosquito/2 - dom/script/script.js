class SimpleChat {
    constructor() {
        this._mainContainer = document.querySelector('[data-chat="containerForInnerBlock"]');
        this._incomingData = document.querySelector('[data-chat="dataInput"]');
        this._wrapperForAllNode = null;
        this._wrapperForInfoAndMessageBlock = null;
        this._parapgraphForNode = null;
        this._styleTextNode = null;
        this._wrapperForImage = null;
        this._counter = 0;
        this.init();
    }

    init() {
    this.createElement();
    this.eventListener();
}

createElement() {
    const sectionNode = document.createElement("section");

    const divNode = document.createElement("div");

    const pNode = document.createElement("p");

    const smallNode = document.createElement("small");

    const imgForUserNode = document.createElement("img");

    this._wrapperForAllNode = sectionNode;
    this._wrapperForInfoAndMessageBlock = divNode;
    this._parapgraphForNode = pNode;
    this._styleTextNode = smallNode;
    this._wrapperForImage = imgForUserNode;
}

get section() {
    return this._wrapperForAllNode.cloneNode(true);
}

get div() {
    return this._wrapperForInfoAndMessageBlock.cloneNode(true);
}

get p() {
    return this._parapgraphForNode.cloneNode(true);
}

get small() {
    return this._styleTextNode.cloneNode(true);
}

get img() {
    return this._wrapperForImage.cloneNode(true);
}

createChatRows(flag, textContent) {
    const now = new Date();
    const timeNormilize = () => {
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${hours}:${minutes}:${seconds}`;
    };

    const userBlock = (textContent) => {
        const section = this.section;
        section.classList.add("chat__user");

        const divForInfo = this.div;
        divForInfo.classList.add("chat__user-info");

        const nameOfUser = this.p;
        nameOfUser.textContent = "Anie Smith";

        const timeMessage = this.p;
        const styleForTime = this.small;
        styleForTime.innerHTML = timeNormilize();

        const avatar = this.img;
        avatar.src = `img/avatar_2.png`;
        avatar.classList.add("chat__user-avatar");

        const messageBlock = this.div;
        messageBlock.classList.add("chat__user-message");

        const message = this.p;
        message.innerHTML = textContent;

        messageBlock.appendChild(message);
        timeMessage.appendChild(styleForTime);
        divForInfo.appendChild(nameOfUser);
        divForInfo.appendChild(timeMessage);
        section.appendChild(divForInfo);
        section.appendChild(avatar);
        section.appendChild(messageBlock);

        this._mainContainer.appendChild(section);
    };

    const opponentBlock = () => {
        const section = this.section;
        section.classList.add("chat__opponent");

        const messageBlock = this.div;
        messageBlock.classList.add("chat__opponent-message");

        const message = this.p;
        message.textContent = textContent;

        const avatar = this.img;
        avatar.src = `img/avatar_1.png`;
        avatar.classList.add("chat__opponent-avatar");

        const divForInfo = this.div;
        divForInfo.classList.add("chat__opponent-info");


        const nameOfUser = this.p;
        nameOfUser.textContent = "Jack Silverston";

        const timeMessage = this.p;
        const styleForTime = this.small;
        styleForTime.innerHTML = timeNormilize();

        messageBlock.appendChild(message);
        section.appendChild(messageBlock);
        section.appendChild(avatar);
        timeMessage.appendChild(styleForTime);
        divForInfo.appendChild(nameOfUser);
        divForInfo.appendChild(timeMessage);
        section.appendChild(divForInfo);

        this._mainContainer.appendChild(section);
    };

    // const tooltip = (textContent) => {
    //   const div = this.div;
    //   div.className = "tooltip";
    //   div.dataset.tooltip = "tooltip";
    //   div.innerHTML = textContent;

    //   this._incomingData.parentElement.append(div);
    // };

    switch (flag) {
        case "user":
            return userBlock(textContent);
        case "opponent":
            return opponentBlock(textContent);
      //   case "tooltip":
      //     return tooltip(textContent);
    }
}

eventListener() {
    document.addEventListener("click", (e) => {
        const atributesForCheck = e.target.dataset.chat;
        if (atributesForCheck !== "ActionButton") return;
        this.action();
    });

    document.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    // document.addEventListener("input", (e) => {
    //   const atributesForCheck = e.target.dataset.chat;
    //   const atributesToolTip = e.target.dataset.tooltip;
    //   if (atributesForCheck !== "dataInput") return;
    //   this.debounceTool(atributesToolTip);
    // });
}

action() {
    const textContent = this._incomingData.value.trim();
    if (!textContent) return;
    const superFlag = ["user", "opponent"][this._counter % 2];
    this.createChatRows(superFlag, textContent);
    this._incomingData.value = "";
    this._counter++;
}

  //   debounceTool(atributesToolTip) {
  //     let tooltip = document.querySelector('[data-tooltip="tooltip"]');

  //     const changeStyle = () => {
  //       if (tooltip) {
  //         tooltip.remove();
  //       } else {
  //         this.createChatRows("tooltip", atributesToolTip);
  //       }
  //     };
  //     function debounce(f, ms) {
  //       let isCooldown = false;
  //       return function () {
  //         if (isCooldown) return;
  //         f.apply(this, arguments);
  //         isCooldown = true;
  //         setTimeout(() => (isCooldown = false), ms);
  //       };
  //     }
  //     debounce(changeStyle(), 1000);
  //   }
}

new SimpleChat();
