public class program {
    public static void main(String[] args) {
        String given = "PROGRAM";
        int n = given.length();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
            if (j == i) {
                System.out.print(given.charAt(i) + " ");
            }
            else if (j == n - i - 1) {
                System.out.print(given.charAt(n-i-1) + " ");
            } else {
                System.out.print("  ");
            }
            }
            System.out.println();
        }
    }
}
