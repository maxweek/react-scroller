import { useEffect, useRef } from "react"
import "./styles.scss"
import Scroller, { IScroller, IScrollerProperties, IScrollerRef } from "./scroller"

function App() {
  const scrollerRef = useRef<IScrollerRef>(null)

  const scrollToStart = () => {
    scrollerRef.current?.scrollToStart() // scroll to start
  }
  const scrollToEnd = () => {
    scrollerRef.current?.scrollToEnd()   // scroll to end
  }
  const scrollTo = () => {
    scrollerRef.current?.scrollTo(100)   // scroll to 100px
  }
  const update = () => {
    scrollerRef.current?.update()        // update scroll calculations
  }
  const getProperties = () => {
    if (!scrollerRef.current) return
    let properties: IScrollerProperties = scrollerRef.current?.getProperties() // get properties of scroller object
  }
  const getScrollerRef = () => {
    scrollerRef.current?.scrollRef       // get ref of main scroller box to contol manualy
  }

  const props: Partial<IScroller> = {
    needBar: true,
    barAltPosition: false,
    horizontal: false,
    grab: true,
    borderFade: true,
    borderPadding: true,
    grabCursor: true,
    className: 'your-scroller-class',
    barClassName: 'your-scroller-bar-class',
    barRollerClassName: 'your-scroller-bar-roller-class',
    contentClassName: 'your-scroller-content-class',
    onScroll: (progress: number) => {console.log(`scroll progress ${progress}`)},
    onReachStart: () => {console.log('reach start')},
    onReachEnd: () => {console.log('reach end')},
  }

  return (
    <div className="app">
      <div className="app__inner">
        <div className="app__item">
          <div className="app__item_title" onClick={scrollerRef.current?.update}>
            Base scroll
          </div>
          <div className="app__item_box">
            <Scroller
              ref={scrollerRef}
              {...props}
            >
              <p style={{ padding: '1rem' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora unde voluptatibus quod ex culpa officia vitae corporis hic! Enim assumenda aut, nostrum commodi quam repudiandae. Aperiam repellat harum error qui vitae provident eum amet odit possimus nam dolorum earum nesciunt dolorem non inventore quae id obcaecati itaque voluptatibus, repudiandae beatae? Sint, exercitationem tempore? Nisi, pariatur culpa ullam vel debitis commodi quas officia quae iure perferendis sed eum minus ad esse doloribus a! Incidunt odit ipsum, magnam maiores voluptatum deserunt eveniet fugiat, modi nemo dicta aliquam voluptates nobis totam illum omnis! Eligendi incidunt odio esse, impedit tempora dolores commodi excepturi molestiae voluptatibus quam pariatur corporis suscipit! Itaque omnis quasi voluptatem dignissimos quia suscipit tempora doloremque enim, minima sit. Eaque at tempora amet incidunt eos. Consequuntur, accusantium optio. Reprehenderit ipsum ipsam impedit aspernatur excepturi facilis ab eaque saepe, pariatur incidunt sunt quisquam eum. Excepturi, quam aut. Modi repudiandae debitis dignissimos eos eveniet eligendi praesentium eaque, alias beatae autem magni deserunt voluptate assumenda excepturi vel esse voluptatibus qui. Adipisci eligendi consectetur consequuntur totam modi nobis amet, animi voluptatibus veritatis corporis officiis accusantium vitae nemo quam debitis eos. Nobis quia praesentium voluptates, quisquam quibusdam eius accusamus iste non. Doloribus officia sed ipsum aliquid ut suscipit voluptates delectus exercitationem consequuntur at accusamus libero, qui saepe consequatur facilis autem corporis, necessitatibus totam enim maxime. Corrupti veniam sequi ea, deleniti repellendus praesentium omnis fugit, repellat, exercitationem qui mollitia ratione ut recusandae ipsum eveniet provident vero error hic velit placeat vel quis! Veniam recusandae dolores, reprehenderit temporibus placeat a suscipit impedit rem laborum reiciendis! Pariatur consequatur dolorum architecto harum accusantium blanditiis esse labore, quasi nihil fuga, nostrum odit hic eius qui laboriosam aliquid possimus optio magni. Rem architecto quae atque, itaque asperiores officiis consequatur numquam dolorem modi fuga dolor neque sequi sapiente laboriosam voluptatibus, magni quis eveniet?</p>
              <p style={{ padding: '1rem' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora unde voluptatibus quod ex culpa officia vitae corporis hic! Enim assumenda aut, nostrum commodi quam repudiandae. Aperiam repellat harum error qui vitae provident eum amet odit possimus nam dolorum earum nesciunt dolorem non inventore quae id obcaecati itaque voluptatibus, repudiandae beatae? Sint, exercitationem tempore? Nisi, pariatur culpa ullam vel debitis commodi quas officia quae iure perferendis sed eum minus ad esse doloribus a! Incidunt odit ipsum, magnam maiores voluptatum deserunt eveniet fugiat, modi nemo dicta aliquam voluptates nobis totam illum omnis! Eligendi incidunt odio esse, impedit tempora dolores commodi excepturi molestiae voluptatibus quam pariatur corporis suscipit! Itaque omnis quasi voluptatem dignissimos quia suscipit tempora doloremque enim, minima sit. Eaque at tempora amet incidunt eos. Consequuntur, accusantium optio. Reprehenderit ipsum ipsam impedit aspernatur excepturi facilis ab eaque saepe, pariatur incidunt sunt quisquam eum. Excepturi, quam aut. Modi repudiandae debitis dignissimos eos eveniet eligendi praesentium eaque, alias beatae autem magni deserunt voluptate assumenda excepturi vel esse voluptatibus qui. Adipisci eligendi consectetur consequuntur totam modi nobis amet, animi voluptatibus veritatis corporis officiis accusantium vitae nemo quam debitis eos. Nobis quia praesentium voluptates, quisquam quibusdam eius accusamus iste non. Doloribus officia sed ipsum aliquid ut suscipit voluptates delectus exercitationem consequuntur at accusamus libero, qui saepe consequatur facilis autem corporis, necessitatibus totam enim maxime. Corrupti veniam sequi ea, deleniti repellendus praesentium omnis fugit, repellat, exercitationem qui mollitia ratione ut recusandae ipsum eveniet provident vero error hic velit placeat vel quis! Veniam recusandae dolores, reprehenderit temporibus placeat a suscipit impedit rem laborum reiciendis! Pariatur consequatur dolorum architecto harum accusantium blanditiis esse labore, quasi nihil fuga, nostrum odit hic eius qui laboriosam aliquid possimus optio magni. Rem architecto quae atque, itaque asperiores officiis consequatur numquam dolorem modi fuga dolor neque sequi sapiente laboriosam voluptatibus, magni quis eveniet?</p>
              <p style={{ padding: '1rem' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora unde voluptatibus quod ex culpa officia vitae corporis hic! Enim assumenda aut, nostrum commodi quam repudiandae. Aperiam repellat harum error qui vitae provident eum amet odit possimus nam dolorum earum nesciunt dolorem non inventore quae id obcaecati itaque voluptatibus, repudiandae beatae? Sint, exercitationem tempore? Nisi, pariatur culpa ullam vel debitis commodi quas officia quae iure perferendis sed eum minus ad esse doloribus a! Incidunt odit ipsum, magnam maiores voluptatum deserunt eveniet fugiat, modi nemo dicta aliquam voluptates nobis totam illum omnis! Eligendi incidunt odio esse, impedit tempora dolores commodi excepturi molestiae voluptatibus quam pariatur corporis suscipit! Itaque omnis quasi voluptatem dignissimos quia suscipit tempora doloremque enim, minima sit. Eaque at tempora amet incidunt eos. Consequuntur, accusantium optio. Reprehenderit ipsum ipsam impedit aspernatur excepturi facilis ab eaque saepe, pariatur incidunt sunt quisquam eum. Excepturi, quam aut. Modi repudiandae debitis dignissimos eos eveniet eligendi praesentium eaque, alias beatae autem magni deserunt voluptate assumenda excepturi vel esse voluptatibus qui. Adipisci eligendi consectetur consequuntur totam modi nobis amet, animi voluptatibus veritatis corporis officiis accusantium vitae nemo quam debitis eos. Nobis quia praesentium voluptates, quisquam quibusdam eius accusamus iste non. Doloribus officia sed ipsum aliquid ut suscipit voluptates delectus exercitationem consequuntur at accusamus libero, qui saepe consequatur facilis autem corporis, necessitatibus totam enim maxime. Corrupti veniam sequi ea, deleniti repellendus praesentium omnis fugit, repellat, exercitationem qui mollitia ratione ut recusandae ipsum eveniet provident vero error hic velit placeat vel quis! Veniam recusandae dolores, reprehenderit temporibus placeat a suscipit impedit rem laborum reiciendis! Pariatur consequatur dolorum architecto harum accusantium blanditiis esse labore, quasi nihil fuga, nostrum odit hic eius qui laboriosam aliquid possimus optio magni. Rem architecto quae atque, itaque asperiores officiis consequatur numquam dolorem modi fuga dolor neque sequi sapiente laboriosam voluptatibus, magni quis eveniet?</p>
            </Scroller>
          </div>
        </div>
        <div className="app__item">
          <div className="app__item_title">
            Base scroll
          </div>
          <div className="app__item_box">
            <Scroller
              horizontal={true}
              needBar={true}
              // onReachEnd={() => console.log('reach end')}
              // onReachStart={() => console.log('reach start')}
            >
              <div style={{ minWidth: 1000 }}>
                <p style={{ padding: '1rem' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora unde voluptatibus quod ex culpa officia vitae corporis hic! Enim assumenda aut, nostrum commodi quam repudiandae. Aperiam repellat harum error qui vitae provident eum amet odit possimus nam dolorum earum nesciunt dolorem non inventore quae id obcaecati itaque voluptatibus, repudiandae beatae? Sint, exercitationem tempore? Nisi, pariatur culpa ullam vel debitis commodi quas officia quae iure perferendis sed eum minus ad esse doloribus a! Incidunt odit ipsum, magnam maiores voluptatum deserunt eveniet fugiat, modi nemo dicta aliquam voluptates nobis totam illum omnis! Eligendi incidunt odio esse, impedit tempora dolores commodi excepturi molestiae voluptatibus quam pariatur corporis suscipit! Itaque omnis quasi voluptatem dignissimos quia suscipit tempora doloremque enim, minima sit. Eaque at tempora amet incidunt eos. Consequuntur, accusantium optio. Reprehenderit ipsum ipsam impedit aspernatur excepturi facilis ab eaque saepe, pariatur incidunt sunt quisquam eum. Excepturi, quam aut. Modi repudiandae debitis dignissimos eos eveniet eligendi praesentium eaque, alias beatae autem magni deserunt voluptate assumenda excepturi vel esse voluptatibus qui. Adipisci eligendi consectetur consequuntur totam modi nobis amet, animi voluptatibus veritatis corporis officiis accusantium vitae nemo quam debitis eos. Nobis quia praesentium voluptates, quisquam quibusdam eius accusamus iste non. Doloribus officia sed ipsum aliquid ut suscipit voluptates delectus exercitationem consequuntur at accusamus libero, qui saepe consequatur facilis autem corporis, necessitatibus totam enim maxime. Corrupti veniam sequi ea, deleniti repellendus praesentium omnis fugit, repellat, exercitationem qui mollitia ratione ut recusandae ipsum eveniet provident vero error hic velit placeat vel quis! Veniam recusandae dolores, reprehenderit temporibus placeat a suscipit impedit rem laborum reiciendis! Pariatur consequatur dolorum architecto harum accusantium blanditiis esse labore, quasi nihil fuga, nostrum odit hic eius qui laboriosam aliquid possimus optio magni. Rem architecto quae atque, itaque asperiores officiis consequatur numquam dolorem modi fuga dolor neque sequi sapiente laboriosam voluptatibus, magni quis eveniet?</p>
                <p style={{ padding: '1rem' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora unde voluptatibus quod ex culpa officia vitae corporis hic! Enim assumenda aut, nostrum commodi quam repudiandae. Aperiam repellat harum error qui vitae provident eum amet odit possimus nam dolorum earum nesciunt dolorem non inventore quae id obcaecati itaque voluptatibus, repudiandae beatae? Sint, exercitationem tempore? Nisi, pariatur culpa ullam vel debitis commodi quas officia quae iure perferendis sed eum minus ad esse doloribus a! Incidunt odit ipsum, magnam maiores voluptatum deserunt eveniet fugiat, modi nemo dicta aliquam voluptates nobis totam illum omnis! Eligendi incidunt odio esse, impedit tempora dolores commodi excepturi molestiae voluptatibus quam pariatur corporis suscipit! Itaque omnis quasi voluptatem dignissimos quia suscipit tempora doloremque enim, minima sit. Eaque at tempora amet incidunt eos. Consequuntur, accusantium optio. Reprehenderit ipsum ipsam impedit aspernatur excepturi facilis ab eaque saepe, pariatur incidunt sunt quisquam eum. Excepturi, quam aut. Modi repudiandae debitis dignissimos eos eveniet eligendi praesentium eaque, alias beatae autem magni deserunt voluptate assumenda excepturi vel esse voluptatibus qui. Adipisci eligendi consectetur consequuntur totam modi nobis amet, animi voluptatibus veritatis corporis officiis accusantium vitae nemo quam debitis eos. Nobis quia praesentium voluptates, quisquam quibusdam eius accusamus iste non. Doloribus officia sed ipsum aliquid ut suscipit voluptates delectus exercitationem consequuntur at accusamus libero, qui saepe consequatur facilis autem corporis, necessitatibus totam enim maxime. Corrupti veniam sequi ea, deleniti repellendus praesentium omnis fugit, repellat, exercitationem qui mollitia ratione ut recusandae ipsum eveniet provident vero error hic velit placeat vel quis! Veniam recusandae dolores, reprehenderit temporibus placeat a suscipit impedit rem laborum reiciendis! Pariatur consequatur dolorum architecto harum accusantium blanditiis esse labore, quasi nihil fuga, nostrum odit hic eius qui laboriosam aliquid possimus optio magni. Rem architecto quae atque, itaque asperiores officiis consequatur numquam dolorem modi fuga dolor neque sequi sapiente laboriosam voluptatibus, magni quis eveniet?</p>
                <p style={{ padding: '1rem' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora unde voluptatibus quod ex culpa officia vitae corporis hic! Enim assumenda aut, nostrum commodi quam repudiandae. Aperiam repellat harum error qui vitae provident eum amet odit possimus nam dolorum earum nesciunt dolorem non inventore quae id obcaecati itaque voluptatibus, repudiandae beatae? Sint, exercitationem tempore? Nisi, pariatur culpa ullam vel debitis commodi quas officia quae iure perferendis sed eum minus ad esse doloribus a! Incidunt odit ipsum, magnam maiores voluptatum deserunt eveniet fugiat, modi nemo dicta aliquam voluptates nobis totam illum omnis! Eligendi incidunt odio esse, impedit tempora dolores commodi excepturi molestiae voluptatibus quam pariatur corporis suscipit! Itaque omnis quasi voluptatem dignissimos quia suscipit tempora doloremque enim, minima sit. Eaque at tempora amet incidunt eos. Consequuntur, accusantium optio. Reprehenderit ipsum ipsam impedit aspernatur excepturi facilis ab eaque saepe, pariatur incidunt sunt quisquam eum. Excepturi, quam aut. Modi repudiandae debitis dignissimos eos eveniet eligendi praesentium eaque, alias beatae autem magni deserunt voluptate assumenda excepturi vel esse voluptatibus qui. Adipisci eligendi consectetur consequuntur totam modi nobis amet, animi voluptatibus veritatis corporis officiis accusantium vitae nemo quam debitis eos. Nobis quia praesentium voluptates, quisquam quibusdam eius accusamus iste non. Doloribus officia sed ipsum aliquid ut suscipit voluptates delectus exercitationem consequuntur at accusamus libero, qui saepe consequatur facilis autem corporis, necessitatibus totam enim maxime. Corrupti veniam sequi ea, deleniti repellendus praesentium omnis fugit, repellat, exercitationem qui mollitia ratione ut recusandae ipsum eveniet provident vero error hic velit placeat vel quis! Veniam recusandae dolores, reprehenderit temporibus placeat a suscipit impedit rem laborum reiciendis! Pariatur consequatur dolorum architecto harum accusantium blanditiis esse labore, quasi nihil fuga, nostrum odit hic eius qui laboriosam aliquid possimus optio magni. Rem architecto quae atque, itaque asperiores officiis consequatur numquam dolorem modi fuga dolor neque sequi sapiente laboriosam voluptatibus, magni quis eveniet?</p>
                <p style={{ padding: '1rem' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora unde voluptatibus quod ex culpa officia vitae corporis hic! Enim assumenda aut, nostrum commodi quam repudiandae. Aperiam repellat harum error qui vitae provident eum amet odit possimus nam dolorum earum nesciunt dolorem non inventore quae id obcaecati itaque voluptatibus, repudiandae beatae? Sint, exercitationem tempore? Nisi, pariatur culpa ullam vel debitis commodi quas officia quae iure perferendis sed eum minus ad esse doloribus a! Incidunt odit ipsum, magnam maiores voluptatum deserunt eveniet fugiat, modi nemo dicta aliquam voluptates nobis totam illum omnis! Eligendi incidunt odio esse, impedit tempora dolores commodi excepturi molestiae voluptatibus quam pariatur corporis suscipit! Itaque omnis quasi voluptatem dignissimos quia suscipit tempora doloremque enim, minima sit. Eaque at tempora amet incidunt eos. Consequuntur, accusantium optio. Reprehenderit ipsum ipsam impedit aspernatur excepturi facilis ab eaque saepe, pariatur incidunt sunt quisquam eum. Excepturi, quam aut. Modi repudiandae debitis dignissimos eos eveniet eligendi praesentium eaque, alias beatae autem magni deserunt voluptate assumenda excepturi vel esse voluptatibus qui. Adipisci eligendi consectetur consequuntur totam modi nobis amet, animi voluptatibus veritatis corporis officiis accusantium vitae nemo quam debitis eos. Nobis quia praesentium voluptates, quisquam quibusdam eius accusamus iste non. Doloribus officia sed ipsum aliquid ut suscipit voluptates delectus exercitationem consequuntur at accusamus libero, qui saepe consequatur facilis autem corporis, necessitatibus totam enim maxime. Corrupti veniam sequi ea, deleniti repellendus praesentium omnis fugit, repellat, exercitationem qui mollitia ratione ut recusandae ipsum eveniet provident vero error hic velit placeat vel quis! Veniam recusandae dolores, reprehenderit temporibus placeat a suscipit impedit rem laborum reiciendis! Pariatur consequatur dolorum architecto harum accusantium blanditiis esse labore, quasi nihil fuga, nostrum odit hic eius qui laboriosam aliquid possimus optio magni. Rem architecto quae atque, itaque asperiores officiis consequatur numquam dolorem modi fuga dolor neque sequi sapiente laboriosam voluptatibus, magni quis eveniet?</p>
              </div>
            </Scroller>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
