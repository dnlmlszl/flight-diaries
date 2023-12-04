interface NotifyProps {
  notify: string;
}

const Notify: React.FC<NotifyProps> = ({ notify }) => {
  return (
    <div>
      <p>{notify}</p>
    </div>
  );
};

export default Notify;
