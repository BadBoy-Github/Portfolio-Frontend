


const Chat = () => {
  return (
    <>
      <section id="chat" className="section ">
        <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
          <h2 className="headline-2">ChatBot</h2>
          <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
            Chatbot description
          </p>
        </div>
        <div className="container">
          <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-4">
            <div className="bg-red-500">
              <h1>Chatbot</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                laudantium adipisci harum distinctio quidem et quam similique
                nulla in nesciunt, sunt ratione nam porro repudiandae magni.
                Voluptatibus at totam deleniti cumque, iste ducimus quaerat
                error maxime distinctio eos quisquam amet voluptatum aspernatur
                earum suscipit beatae labore placeat laboriosam provident
                voluptatem!
              </p>
              <button className="bg-gray-500 px-2 py-1 rounded-lg text-sm">Download Resume</button>
            </div>
            <div className="bg-zinc-700/70 w-full h-[400px] rounded-2xl flex flex-col justify-between gap-2">
              <div className=" h-full rounded-2xl p-4">
                <div className="bg-red-500 h-full">
                  AI: Hi <br />
                  Me: Hello
                </div>
              </div>
              <div className=" px-4 pt-1 pb-4 gap-3 rounded-2xl grid grid-cols-[84%_14%]">
                <input
                  type="text"
                  className="bg-zinc-800 text-sky-100 outline-none rounded-lg px-2 py-1 transition-all duration-500"
                  placeholder="Wanna know about me?"
                  size={40}
                />
                <button className="bg-zinc-800 px-2 py-1 rounded-lg text-sm">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Chat