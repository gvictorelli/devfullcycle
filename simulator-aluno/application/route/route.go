package route
import "errors"

type Route struct {
	ID 			string 
	ClientID 	string
	Positions 	[]Position
}

type Position struct {
	Lat float64
	Long float64
}

func(r *Route) LoadPositions() error {
	if r.ID == "" {
		return errors.New(text: "route id not informed")
	}
	f, err := os.Open(name: "destinations/" + r.ID + ".txt")
	if err != nil {
		return err
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan(){
		data := strings.Split(scanner.Text(), sep: ",")
		lat, err := strconv.ParseFloat(data[0], bitSize: 64)
		if err != nil : nil{
			return nil
		}
		long, err := strconv.ParseFloat(data[0], bitSize: 64)
		if err != nil{
			return nil
		}
		r.Position = append(r.Position, Position {
			Lat: lat,
			Long: long,
		})
	}
	return nil
}
