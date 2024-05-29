interface Props {
    params: { id: string };
}

export default function NoticeDetails({ params }: Props) {
    console.log('teste2');
    return (
        <>
            <h1>edital: {params.id}</h1>
        </>
    );
}
