import React, { Component, Fragment } from 'react';

interface IProps { name: string }

function WelcomeString(name: string) {
    return <h1>Helo world!, {name}.</h1>
}

function Welcome(props: IProps) {
    return WelcomeString(props.name);
}

class WelcomeClass extends React.Component<IProps> {
    render() {
        return WelcomeString(this.props.name);
    }
}

type IClockProps = { intervalTime: number }
type IClockState = { date: Date } & IClockProps;
class Clock extends React.Component<IClockProps, IClockState> {
    public timerId: NodeJS.Timeout | null = null;

    constructor(props: IClockProps) {
        super(props);
        this.state = {
            date: new Date(),
            intervalTime: props.intervalTime || 1000,
        }
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            this.state.intervalTime,
        );
    }

    componentWillUnmount() {
        this.timerId && clearInterval(this.timerId);
    }

    tick() {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        return (
            <div>
                <h1>Привет, мир!</h1>
                <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

type ToggleProps = {};
type ToggleState = { isToggleOn: boolean };
class Toggle extends React.Component<ToggleProps, ToggleState> {

    state = {
        isToggleOn: true
    }

    // constructor(props: ToggleProps) {
    //   super(props);
    //   this.state = { isToggleOn: true };

    //   this.handleClick = this.handleClick.bind(this);
    // }

    handleClick = () => {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn,
        }))
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'On' : 'Off'}
            </button>
        )
    }
}

type FormNameProps = { name?: string, onNameChange: Function };

class FormName extends Component<FormNameProps> {

    state = {
        name: this.props.name || ''
    }

    handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        this.props.onNameChange(this.state.name);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Your name: &nbsp;
          <input
                        type="search"
                        name="username"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </label>
            </form>
        )
    }
}

export class App extends Component {

    state = {
        name: 'Roamn C.',
        userList: [
            { id: '1', name: 'Алиса', interval: 1000 },
            { id: '2', name: 'Буратино', interval: 3000 },
        ]
    };

    handleNameChange = (name: string) => {
        this.setState({
            name
        })
    }

    render() {
        const users = this.state.userList

        return (
            <Fragment>
                <WelcomeClass name={this.state.name} />

                <FormName
                    name={this.state.name}
                    onNameChange={this.handleNameChange}
                />
                < Toggle />

                {users.map(user => {
                    return (
                        <Fragment key={user.id}>
                            <Welcome name={user.name} />
                            <Clock intervalTime={user.interval} />
                        </Fragment>
                    )
                })}
            </Fragment>
        );
    }
}