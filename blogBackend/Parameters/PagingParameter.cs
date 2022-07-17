namespace blogBackend.Parameters
{
    public class PagingParameter
    {
        const int maxPageSize = int.MaxValue;

        public int pageNumber { get; set; } = 1;

        private int _pageSize { get; set; } = maxPageSize;

        public int pageSize
        {

            get { return _pageSize; }
            set
            {
                _pageSize = value < 1 ? maxPageSize : value;
            }
        }
    }
}
