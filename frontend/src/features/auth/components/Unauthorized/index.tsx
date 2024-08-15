import { Button } from 'antd'

export const Unauthorized = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <h1>Unauthorized</h1>
            <Button
                type="primary"
                href="/login"
                style={{
                    marginLeft: '10px',
                }}
            >
                Login
            </Button>
        </div>
    )
}
