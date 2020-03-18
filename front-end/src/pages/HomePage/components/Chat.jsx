import React from 'react';
import { Picker } from 'emoji-mart';
import { Scrollbars } from 'react-custom-scrollbars';
import emoji from 'react-easy-emoji';
import 'emoji-mart/css/emoji-mart.css'

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmoji: false,
            value: "",
        }
        this.scrollComponent = React.createRef();
    }

    componentDidUpdate(){
        this.scrollComponent.scrollToBottom();
    }

    toggleEmoji(){
        this.setState({showEmoji: !this.state.showEmoji})
    }

    hideEmoji(){
        this.setState({showEmoji: false})
    }

    handleSubmit(){
        const { sendChat } = this.props
        if(!this.state.value.trim()) return;
        sendChat(this.state.value)
        this.setState({value: ''})
    }

    handleInput(e) {
        this.setState({value: e.target.value})
    }

    addEmoji(e) {
        console.log(e);
        let emo = e.native;
        this.setState({
            value: this.state.value + emo
        });
    }

    render(){
        const {chatId, conversation} = this.props

        conversation[chatId] = conversation[chatId] ? conversation[chatId] : [];

        return (
            <div style={{height: '100%'}}>
                <div className="fix-height-chat" onClick={e => this.hideEmoji()}>
                    <Scrollbars style={{width: '100%'}} ref={el => this.scrollComponent = el}>
                        {conversation[chatId].map((data, index) => 
                        <div key={index}> 
                            <div style={{display: "flex", justifyContent: (data.type === 'send' ? 'flex-end': 'flex-start')}}>
                                <span className={(data.type === 'send' ? 'bg-primary': 'bg-light') + ' chat-item'}>
                                    { emoji(data.msg) }
                                </span>
                            </div>
                        </div>)}
                    </Scrollbars>
                </div>
                
                <div className="chat-footer">
                    <form
                        onSubmit={e => {
                            e.preventDefault()
                            this.handleSubmit()
                        }}
                    >
                        <div className="input-group mb-3">
                            <div className="input-group-prepend" style={{cursor: "pointer"}} onClick={e => this.toggleEmoji()} >
                                <span className="input-group-text">{emoji('😀')}</span>
                            </div>
                            <input type="text" className="form-control" value={this.state.value} onChange={ e => this.handleInput(e) } disabled={!chatId} onFocus={e => this.hideEmoji()}/>
                            <div className="input-group-append" onClick={e => this.hideEmoji()}>
                                <span className="input-group-text">
                                    <button type="submit">sent</button>
                                </span>
                            </div>
                        </div>
                    
                        <Picker style={{display: this.state.showEmoji ? 'block':'none', position: 'absolute', bottom: '50px', right: '20px'}} onSelect={e => this.addEmoji(e)} useButton={true} />
                    </form>
                </div>
            </div>
        )
    }
}

export default Chat;