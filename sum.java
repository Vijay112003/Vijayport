
import java.util.*;

public class sum{
    static int find_weight(int i){
        int weight =0;
        int sqrt = (int) Math.sqrt(i);
        if(sqrt *sqrt ==i){
            weight += 5;
        }
        if(i % 4 ==0&& i % 6 == 0){
            weight += 4;
        }
        if(i%2 ==0){
            weight += 3;
        }
        return weight;
    }

    public static void main(String args[]){
        List<Integer> arr = Arrays.asList(10, 36, 12, 60, 54, 89);
        List<Integer> weights = new ArrayList<>();
        arr.sort(Comparator.naturalOrder());
        for (int i = 0; i < arr.size(); i++) {
            weights.add(find_weight(arr.get(i)));
        }
        
        for(int i = 0; i < arr.size(); i++) {
            for(int j=i+1; j < arr.size(); j++) {
                if(weights.get(i)< weights.get(j)) {
                    int temp = arr.get(i);
                    arr.set(i, arr.get(j));
                    arr.set(j, temp);
                    
                    temp = weights.get(i);
                    weights.set(i, weights.get(j));
                    weights.set(j, temp);
                }
            }
        }

        for(int i = 0; i < arr.size(); i++) {
            System.out.print("<" + arr.get(i) + ", " + weights.get(i) + "> ");
        }
        System.out.println();
    }
}